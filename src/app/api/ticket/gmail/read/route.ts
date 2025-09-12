import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { htmlToText } from "html-to-text";

// --- Interfaces ---
interface GmailHeader {
  name?: string | null;
  value?: string | null;
}

interface GmailBody {
  data?: string;
}

interface GmailPayload {
  mimeType?: string | null;
  body?: GmailBody;
  headers?: GmailHeader[]; 
  parts?: GmailPayload[];
}

interface ParsedMessage {
  from: string;
  date: string;
  snippet: string;
}

// --- Gmail Client ---
async function getGmailClient() {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  return google.gmail({ version: "v1", auth: oAuth2Client });
}

// --- Extract plain text from payload ---
function getPlainTextFromPayload(payload?: GmailPayload): string {
  if (!payload) return "";

  if (payload.mimeType === "text/plain" && payload.body?.data) {
    const buff = Buffer.from(payload.body.data, "base64");
    return buff.toString("utf-8");
  }

  if (payload.mimeType === "text/html" && payload.body?.data) {
    const buff = Buffer.from(payload.body.data, "base64");
    const html = buff.toString("utf-8");
    return htmlToText(html, {
      wordwrap: false,
      selectors: [{ selector: "a", options: { ignoreHref: true } }],
    }).trim();
  }

  if (payload.parts?.length) {
    for (const part of payload.parts) {
      const text = getPlainTextFromPayload(part);
      if (text) return text;
    }
  }

  return "";
}

// --- Strip quoted replies ---
function cleanReply(snippet: string): string {
  const lines = snippet.split("\n");
  const cleaned: string[] = [];

  for (const line of lines) {
    if (
      line.trim().startsWith(">") ||
      line.trim().startsWith("On ") ||
      line.toLowerCase().includes("wrote:") ||
      line.includes("gmail.com") ||
      line.toLowerCase().includes("original message")
    ) {
      break;
    }
    cleaned.push(line.trim());
  }

  return cleaned.join("\n").trim();
}

// --- Main handler ---
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const ticket_number = searchParams.get("ticket_number");

  if (!email || !ticket_number) {
    return NextResponse.json(
      { error: "Missing email or ticket_number" },
      { status: 400 }
    );
  }

  try {
    const gmail = await getGmailClient();

    const query = `to:"${email}" OR from:"${email}" subject:"Ticket #${ticket_number}"`;

    const list = await gmail.users.messages.list({
      userId: "me",
      q: query,
      maxResults: 20,
    });

    const messages: ParsedMessage[] = [];

    if (list.data.messages?.length) {
      for (const m of list.data.messages) {
        const messageId = m.id!;
        
        // Fetch full message
        const full = await gmail.users.messages.get({
          userId: "me",
          id: messageId,
          format: "full",
        });

        const payload = full.data.payload as GmailPayload;
        const headers = payload?.headers ?? [];

        const fromHeader = headers.find((h) => h.name === "From")?.value || "";
        const dateHeader = headers.find((h) => h.name === "Date")?.value || "";

        const match = fromHeader.match(/<(.+?)>/);
        const fromEmail = match
          ? match[1].toLowerCase()
          : fromHeader.toLowerCase();

        const bodyText = getPlainTextFromPayload(payload);
        const cleanedBody = cleanReply(bodyText);

        messages.push({
          from: fromEmail,
          date: dateHeader
            ? new Date(dateHeader).toISOString()
            : new Date().toISOString(),
          snippet: cleanedBody || "(No content)",
        });

        // ✅ Mark as read if message is from user
        if (fromEmail === email.toLowerCase()) {
          await gmail.users.messages.modify({
            userId: "me",
            id: messageId,
            requestBody: {
              removeLabelIds: ["UNREAD"],
            },
          });
        }
      }
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Gmail fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Gmail messages" },
      { status: 500 }
    );
  }
}
