// import { NextRequest, NextResponse } from "next/server";
// import { getPool } from "@/lib/db";
// import type { RowDataPacket } from "mysql2";

// type Ticket = {
//   ticket_number: string;
//   email: string;
//   concern: string;
//   date_created: string;
//   status: string;
//   claimed_by?: number;
//   claimed_at?: string;
// };

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { ticket_number: string } }
// ) {
//   const { ticket_number } = params;
//   const { userId } = await req.json();

//   if (!userId) {
//     return NextResponse.json(
//       { message: "User ID is required to claim ticket." },
//       { status: 400 }
//     );
//   }

//   try {
//     const pool = getPool();

//     // Check if ticket exists
//     const [rows] = await pool.execute<RowDataPacket[] & Ticket[]>(
//       "SELECT * FROM ticket WHERE ticket_number = ?",
//       [ticket_number]
//     );

//     if (rows.length === 0) {
//       return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
//     }

//     const ticket = rows[0];

//     if (ticket.status === "claimed") {
//       return NextResponse.json(
//         { message: "Ticket already claimed" },
//         { status: 400 }
//       );
//     }

//     // Update ticket status
//     await pool.execute(
//       "UPDATE ticket SET status = ?, claimed_by = ?, claimed_at = NOW() WHERE ticket_number = ?",
//       ["claimed", userId, ticket_number]
//     );

//     return NextResponse.json(
//       { message: "Ticket claimed successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error claiming ticket:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }






// import { NextRequest, NextResponse } from "next/server";
// import { getPool } from "@/lib/db";
// import type { RowDataPacket } from "mysql2";

// type Ticket = {
//   ticket_number: string;
//   email: string;
//   concern: string;
//   date_created: string;
//   status: string;
//   claimed_by?: number;
//   claimed_at?: string;
// };

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { ticket_number: string } }
// ) {
//   const { ticket_number } = params;
//   const { userId } = await req.json();

//   if (!userId) {
//     return NextResponse.json(
//       { message: "User ID is required to claim ticket." },
//       { status: 400 }
//     );
//   }

//   try {
//     const pool = getPool();

//     // Check if the user already claimed a ticket
//     const [claimedTickets] = await pool.execute<RowDataPacket[]>(
//       "SELECT * FROM ticket WHERE status = 'claimed' AND claimed_by = ?",
//       [userId]
//     );

//     if (claimedTickets.length > 0) {
//       return NextResponse.json(
//         { message: "Please fix your recent ticket before claiming another." },
//         { status: 400 }
//       );
//     }

//     // Check if ticket exists
//     const [rows] = await pool.execute<RowDataPacket[] & Ticket[]>(
//       "SELECT * FROM ticket WHERE ticket_number = ?",
//       [ticket_number]
//     );

//     if (rows.length === 0) {
//       return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
//     }

//     const ticket = rows[0];

//     if (ticket.status === "claimed") {
//       return NextResponse.json(
//         { message: "Ticket already claimed" },
//         { status: 400 }
//       );
//     }

//     // Update ticket status
//     await pool.execute(
//       "UPDATE ticket SET status = ?, claimed_by = ?, claimed_at = NOW() WHERE ticket_number = ?",
//       ["claimed", userId, ticket_number]
//     );

//     return NextResponse.json(
//       { message: "Ticket claimed successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error claiming ticket:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


// now
// import { NextRequest, NextResponse } from "next/server";
// import { getPool } from "@/lib/db";
// import type { RowDataPacket } from "mysql2/promise";
// import nodemailer from "nodemailer";

// export async function PUT(req: NextRequest, { params }: { params: Promise<{ ticket_number: string }> }) {
//   const { ticket_number } = await params;  // Await the promise for params
  
//   const { userId, claimedBy } = await req.json();

//   if (!ticket_number || !userId || !claimedBy) {
//     return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//   }

//   try {
//     const pool = getPool();

//     await pool.execute(
//       `UPDATE ticket SET status = 'claimed', claimed_by = ? WHERE ticket_number = ?`,
//       [userId, ticket_number]
//     );

//     const [rows] = await pool.execute(
//       `SELECT email FROM ticket WHERE ticket_number = ?`,
//       [ticket_number]
//     );

//     const result = rows as RowDataPacket[];
//     if (!result.length || !result[0].email) {
//       return NextResponse.json({ message: "Ticket email not found" }, { status: 404 });
//     }

//     const recipientEmail = result[0].email;

//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Support Team" <${process.env.SMTP_USER}>`,
//       to: recipientEmail,
//       subject: `Ticket #${ticket_number} Claimed`,
//       html: `
//         <p>Hello,</p>
//         <p>Your ticket <strong>#${ticket_number}</strong> has been claimed by <strong>${claimedBy}</strong>.</p>
//         <p>Please wait while we address your concern.</p>
//         <p>Thank you!</p>
//       `,
//     });

//     return NextResponse.json({ message: "Ticket claimed and email sent." });
//   } catch (error) {
//     console.error("Error claiming ticket:", error);
//     return NextResponse.json({ message: "Server error." }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/app/lib/database/db";
import type { RowDataPacket } from "mysql2/promise";
import nodemailer from "nodemailer";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ ticket_number: string }> }) {
  const { ticket_number } = await params;  // Await the promise for params
  
  const { userId, claimedBy } = await req.json();

  if (!ticket_number || !userId || !claimedBy) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const pool = getPool();

    // Check if the user already claimed another ticket
    const [existingClaimedTickets] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM cro_ticket WHERE status = 'claimed' AND claimed_by = ?`,
      [userId]
    );

    if (existingClaimedTickets.length > 0) {
      return NextResponse.json(
        { message: "Please fix your recent ticket before claiming another." },
        { status: 400 }
      );
    }

    // Update the ticket status to 'claimed'
    await pool.execute(
      `UPDATE cro_ticket SET status = 'claimed', claimed_by = ? WHERE ticket_number = ?`,
      [userId, ticket_number]
    );

    // Retrieve the email of the user who created the ticket
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT email FROM cro_ticket WHERE ticket_number = ?`,
      [ticket_number]
    );

    const result = rows as RowDataPacket[];
    if (!result.length || !result[0].email) {
      return NextResponse.json({ message: "Ticket email not found" }, { status: 404 });
    }

    const recipientEmail = result[0].email;

    // Send an email to the ticket creator
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Support Team" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `Ticket #${ticket_number} Claimed`,
      html: `
        <p>Hello,</p>
        <p>Your ticket <strong>#${ticket_number}</strong> has been claimed by <strong>${claimedBy}</strong>.</p>
        <p>Please wait while we address your concern.</p>
        <p>Thank you!</p>
      `,
    });

    return NextResponse.json({ message: "Ticket claimed and email sent." });
  } catch (error) {
    console.error("Error claiming ticket:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}


