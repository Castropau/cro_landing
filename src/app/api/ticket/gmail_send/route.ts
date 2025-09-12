import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

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

// Helper to encode email message as base64
function createRawEmail(to: string, subject: string, body: string): string {
  const messageParts = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    body,
  ];

  const message = messageParts.join("\n");
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return encodedMessage;
}

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { error: "Missing 'to', 'subject', or 'body'" },
        { status: 400 }
      );
    }

    const gmail = await getGmailClient();
    const raw = createRawEmail(to, subject, body);

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw,
      },
    });

    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("Gmail send error:", error);
    return NextResponse.json(
      { error: "Failed to send Gmail message" },
      { status: 500 }
    );
  }
}
// import { google } from "googleapis";
// import { NextRequest, NextResponse } from "next/server";

// // Initialize the Gmail client
// async function getGmailClient() {
//   const oAuth2Client = new google.auth.OAuth2(
//     process.env.GMAIL_CLIENT_ID,
//     process.env.GMAIL_CLIENT_SECRET,
//     process.env.GMAIL_REDIRECT_URI
//   );

//   oAuth2Client.setCredentials({
//     refresh_token: process.env.GMAIL_REFRESH_TOKEN,
//   });

//   return google.gmail({ version: "v1", auth: oAuth2Client });
// }

// // Helper to encode email message as base64
// function createRawEmail(to: string, subject: string, body: string, threadId: string, messageId: string): string {
//   const messageParts = [
//     `To: ${to}`,
//     `Subject: ${subject}`,
//     `In-Reply-To: ${messageId}`,
//     `References: ${messageId}`,
//     "Content-Type: text/plain; charset=utf-8",
//     "",
//     body,
//   ];

//   const message = messageParts.join("\n");
//   const encodedMessage = Buffer.from(message)
//     .toString("base64")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");

//   return encodedMessage;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { to, subject, body, messageId, threadId, ticket_number } = await req.json();

//     console.log("Request received:", { to, subject, body, messageId, threadId, ticket_number });

//     if (!to || !subject || !body || !ticket_number) {
//       return NextResponse.json(
//         { error: "Missing 'to', 'subject', 'body', 'ticket_number'" },
//         { status: 400 }
//       );
//     }

//     // Fetch the Gmail client immediately before any API calls
//     const gmail = await getGmailClient();

//     // If messageId or threadId are not provided, fetch the thread info from Gmail
//     let finalMessageId = messageId;
//     let finalThreadId = threadId;

//     if (!finalMessageId || !finalThreadId) {
//       const res = await gmail.users.messages.list({
//         userId: "me",
//         q: `subject:"Re: Ticket #${ticket_number}"`, // Assuming the subject pattern is consistent
//         maxResults: 1,
//       });

//       if (res.data.messages && res.data.messages.length > 0) {
//         const message = await gmail.users.messages.get({
//           userId: "me",
//           id: res.data.messages[0].id!,
//         });

//         finalMessageId = message.data.id!;
//         finalThreadId = message.data.threadId!;
//       }
//     }

//     if (!finalMessageId || !finalThreadId) {
//       return NextResponse.json(
//         { error: "Unable to find the required messageId or threadId" },
//         { status: 400 }
//       );
//     }

//     const raw = createRawEmail(to, subject, body, finalThreadId, finalMessageId);

//     await gmail.users.messages.send({
//       userId: "me",
//       requestBody: {
//         raw,
//         threadId: finalThreadId,
//       },
//     });

//     return NextResponse.json({ success: true, message: "Reply sent" });
//   } catch (error) {
//     console.error("Gmail send error:", error);
//     return NextResponse.json(
//       { error: "Failed to send Gmail reply", details: error.message },
//       { status: 500 }
//     );
//   }
// }
