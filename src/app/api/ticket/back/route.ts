// // src/app/api/tickets/close_ticket/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import { getPool } from "@/lib/db";

// export async function POST(req: NextRequest) {
//   try {
//     const { ticket_number } = await req.json();

//     if (!ticket_number) {
//       return NextResponse.json({ error: "Ticket number is required" }, { status: 400 });
//     }

//     const pool = getPool();
//     const [result] = await pool.execute(
//       `UPDATE ticket SET status = 'claimed' WHERE ticket_number = ?`,
//       [ticket_number]
//     );

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error closing ticket:", error);
//     return NextResponse.json({ error: "Failed to close ticket" }, { status: 500 });
//   }
// }
// src/app/api/tickets/close_ticket/route.ts

// import { NextRequest, NextResponse } from "next/server";
// // import { getPool } from "@/lib/db";
// import { getPool } from "@/app/lib/database/db";

// import nodemailer from "nodemailer";
// import { RowDataPacket } from "mysql2"; // <-- import this

// // Extend RowDataPacket for correct typing
// interface TicketRow extends RowDataPacket {
//   email: string;
// }

// // Setup transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// export async function POST(req: NextRequest) {
//   try {
//     const { ticket_number, status } = await req.json();

//     if (!ticket_number || !status) {
//       return NextResponse.json({ error: "Missing ticket number or status" }, { status: 400 });
//     }

//     const pool = getPool();

//     // Update ticket status
//     await pool.execute(
//       `UPDATE cro_ticket SET status = 'claimed' WHERE ticket_number = ?`,
//       [ticket_number]
//     );

//     // Fetch email for that ticket
//     const [rows] = await pool.query<TicketRow[]>(
//       `SELECT email FROM cro_ticket WHERE ticket_number = ?`,
//       [ticket_number]
//     );

//     const ticketEmail = rows[0]?.email;

//     if (ticketEmail) {
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: ticketEmail,
//         subject: `Ticket #${ticket_number} is back again`,
//         text: `Hello,\n\nYour ticket (#${ticket_number}) has been reopened and marked as claimed.\n\nWe'll get back to you shortly.\n\n- Support Team`,
//       });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error updating ticket or sending email:", error);
//     return NextResponse.json({ error: "Failed to process ticket" }, { status: 500 });
//   }
// }
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/app/lib/database/db";
import { RowDataPacket } from "mysql2";

// Extend RowDataPacket for correct typing
interface TicketRow extends RowDataPacket {
  email: string;
}

// Setup OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI // e.g., https://developers.google.com/oauthplayground
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export async function POST(req: NextRequest) {
  try {
    const { ticket_number, status } = await req.json();

    if (!ticket_number || !status) {
      return NextResponse.json(
        { error: "Missing ticket number or status" },
        { status: 400 }
      );
    }

    const pool = getPool();

    // 1. Update ticket status
    await pool.execute(
      `UPDATE cro_ticket SET status = 'claimed' WHERE ticket_number = ?`,
      [ticket_number]
    );

    // 2. Get email for that ticket
    const [rows] = await pool.query<TicketRow[]>(
      `SELECT email FROM cro_ticket WHERE ticket_number = ?`,
      [ticket_number]
    );

    const ticketEmail = rows[0]?.email;

    // 3. Send email via Gmail API
    if (ticketEmail) {
      const subject = `Ticket #${ticket_number} is back again`;
      const message = `
To: ${ticketEmail}
Subject: ${subject}

Hello,

Your ticket (#${ticket_number}) has been reopened and marked as claimed.

We'll get back to you shortly.

- Support Team
`;

      const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating ticket or sending Gmail:", error);
    return NextResponse.json(
      { error: "Failed to process ticket" },
      { status: 500 }
    );
  }
}


