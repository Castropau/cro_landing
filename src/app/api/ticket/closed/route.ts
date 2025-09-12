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
//       `UPDATE ticket SET status = 'closed' WHERE ticket_number = ?`,
//       [ticket_number]
//     );

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error closing ticket:", error);
//     return NextResponse.json({ error: "Failed to close ticket" }, { status: 500 });
//   }
// }
// import { NextRequest, NextResponse } from "next/server";
// import { getPool } from "@/lib/db";
// import nodemailer from "nodemailer";

// export async function POST(req: NextRequest) {
//   try {
//     const { ticket_number } = await req.json();

//     if (!ticket_number) {
//       return NextResponse.json({ error: "Ticket number is required" }, { status: 400 });
//     }

//     const pool = getPool();

//     // Update ticket status to 'closed'
//     await pool.execute(
//       `UPDATE ticket SET status = 'closed' WHERE ticket_number = ?`,
//       [ticket_number]
//     );

//     // Fetch ticket email and concern for sending email notification
//     const [rows] = await pool.execute(
//       `SELECT email, concern FROM ticket WHERE ticket_number = ?`,
//       [ticket_number]
//     );

//     if (!Array.isArray(rows) || rows.length === 0) {
//       return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
//     }

//     const ticket = rows[0] as { email: string; concern: string };

//     // Set up nodemailer transporter (Gmail example, replace with your SMTP config)
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     // Email options
//     const mailOptions = {
//       from: `"Support Team" <${process.env.SMTP_USER}>`,
//       to: ticket.email,
//       subject: `Ticket #${ticket_number} has been closed`,
//       html: `
//         <p>Hello,</p>
//         <p>Your ticket with the concern "<strong>${ticket.concern}</strong>" has been marked as <strong>closed</strong>.</p>
//         <p>If you have any questions, please contact support.</p>
//         <p>Thank you!</p>
//       `,
//     };

//     // Send email notification
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error closing ticket and sending email:", error);
//     return NextResponse.json({ error: "Failed to close ticket" }, { status: 500 });
//   }
// }
// import { google } from "googleapis";
// import { NextRequest, NextResponse } from "next/server";
// import { getPool } from "@/lib/db";
// import nodemailer from "nodemailer";

// // Setup OAuth2 client
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.GMAIL_CLIENT_ID,
//   process.env.GMAIL_CLIENT_SECRET,
//   process.env.GMAIL_REDIRECT_URI
// );

// oAuth2Client.setCredentials({
//   refresh_token: process.env.GMAIL_REFRESH_TOKEN,
// });

// const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

// export async function POST(req: NextRequest) {
//   try {
//     const { ticket_number } = await req.json();

//     if (!ticket_number) {
//       return NextResponse.json(
//         { error: "Ticket number is required" },
//         { status: 400 }
//       );
//     }

//     const pool = getPool();

//     // 1. Update ticket status to 'closed'
//     await pool.execute(
//       `UPDATE ticket SET status = 'closed' WHERE ticket_number = ?`,
//       [ticket_number]
//     );

//     // 2. Get user email and concern from DB
//     const [rows] = await pool.execute(
//       `SELECT email, concern FROM ticket WHERE ticket_number = ?`,
//       [ticket_number]
//     );

//     if (!Array.isArray(rows) || rows.length === 0) {
//       return NextResponse.json(
//         { error: "Ticket not found" },
//         { status: 404 }
//       );
//     }

//     const ticket = rows[0] as { email: string; concern: string };

//     // 3. Search Gmail messages matching the ticket
//     const query = `from:${ticket.email} OR to:${ticket.email} subject:"Ticket #${ticket_number}"`;

//     const listRes = await gmail.users.messages.list({
//       userId: "me",
//       q: query,
//       maxResults: 500,
//     });

//     const messageIds = listRes.data.messages?.map((msg) => msg.id).filter(Boolean) || [];

//     // 4. Batch delete messages (send to Trash)
//     if (messageIds.length > 0) {
//       await gmail.users.messages.batchDelete({
//         userId: "me",
//         requestBody: {
//           ids: messageIds,
//         },
//       });
//     }

//     // 5. Send closure email to user
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Support Team" <${process.env.SMTP_USER}>`,
//       to: ticket.email,
//       subject: `Ticket #${ticket_number} has been closed`,
//       html: `
//         <p>Hello,</p>
//         <p>Your ticket with the concern "<strong>${ticket.concern}</strong>" has been marked as <strong>closed</strong>.</p>
//         <p>If you have any further questions, feel free to open another ticket.</p>
//         <p>Thank you!</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({
//       success: true,
//       deletedMessages: messageIds.length,
//     });
//   } catch (error) {
//     console.error("Error closing ticket and deleting emails:", error);
//     return NextResponse.json(
//       { error: "Failed to close ticket and delete messages" },
//       { status: 500 }
//     );
//   }
// }
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/app/lib/database/db";

// Setup OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export async function POST(req: NextRequest) {
  try {
    const { ticket_number } = await req.json();

    if (!ticket_number) {
      return NextResponse.json(
        { error: "Ticket number is required" },
        { status: 400 }
      );
    }

    const pool = getPool();

    // 1. Update ticket status to 'closed'
    await pool.execute(
      `UPDATE cro_ticket SET status = 'closed' WHERE ticket_number = ?`,
      [ticket_number]
    );

    // 2. Get user email and concern from DB
    const [rows] = await pool.execute(
      `SELECT email, concern FROM ticket WHERE ticket_number = ?`,
      [ticket_number]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    const ticket = rows[0] as { email: string; concern: string };

    // 3. Search Gmail messages matching the ticket
    const query = `from:${ticket.email} OR to:${ticket.email} subject:"Ticket #${ticket_number}"`;
    // const query = `(from:${ticket.email} OR to:${ticket.email} OR (from:me to:${ticket.email})) subject:"Ticket #${ticket_number}"`;

    // const query = `(from:${ticket.email} OR to:${ticket.email}) subject:"Ticket #${ticket_number}"`;
    // const query = `to:${ticket.email} subject:"Ticket #${ticket_number}"`;



    const listRes = await gmail.users.messages.list({
      userId: "me",
      q: query,
      maxResults: 500,
    });

    // const messageIds =
    //   listRes.data.messages?.map((msg) => msg.id).filter(Boolean) || [];
    const messageIds: string[] =
  listRes.data.messages?.map((msg) => msg.id).filter((id): id is string => typeof id === "string") || [];


    // 4. Batch delete messages (send to Trash)
    if (messageIds.length > 0) {
      await gmail.users.messages.batchDelete({
        userId: "me",
        requestBody: {
          ids: messageIds,
        },
      });
    }
    // 3. Search Gmail messages matching the ticket
// 3. Search Gmail messages matching the ticket in "Sent"
// const query = `to:${ticket.email} subject:"Ticket #${ticket_number}" label:sent OR from:${ticket.email} OR to:${ticket.email} subject:"Ticket #${ticket_number}"`;

// const listRes = await gmail.users.messages.list({
//   userId: "me",
//   q: query,
//   maxResults: 500,
// });

// const messageIds =
//   listRes.data.messages?.map((msg) => msg.id).filter(Boolean) || [];

// // 4. Delete messages (you can choose between permanent or trash)
// if (messageIds.length > 0) {
//   await gmail.users.messages.batchDelete({
//     userId: "me",
//     requestBody: {
//       ids: messageIds,
//     },
//   });
// }


// OR Option B: Move messages to trash instead
// if (messageIds.length > 0) {
//   await Promise.all(
//     messageIds.map((id) =>
//       gmail.users.messages.trash({
//         userId: "me",
//         id,
//       })
//     )
//   );
// }


    // Removed: Email notification to user

    return NextResponse.json({
      success: true,
      deletedMessages: messageIds.length,
    });
  } catch (error) {
    console.error("Error closing ticket and deleting emails:", error);
    return NextResponse.json(
      { error: "Failed to close ticket and delete messages" },
      { status: 500 }
    );
  }
}
