// // import { NextRequest, NextResponse } from "next/server";
// // import { getPool } from "@/lib/db";
// // import type { RowDataPacket } from "mysql2";

// // type Ticket = {
// //   ticket_number: string;
// //   email: string;
// //   concern: string;
// //   date_created: string;
// //   status: string;
// //   claimed_by?: number;
// //   claimed_at?: string;
// // };

// // export async function PUT(
// //   req: NextRequest,
// //   { params }: { params: { ticket_number: string } }
// // ) {
// //   const { ticket_number } = params;
// //   const { userId } = await req.json();

// //   if (!userId) {
// //     return NextResponse.json(
// //       { message: "User ID is required to claim ticket." },
// //       { status: 400 }
// //     );
// //   }

// //   try {
// //     const pool = getPool();

// //     // Check if ticket exists
// //     const [rows] = await pool.execute<RowDataPacket[] & Ticket[]>(
// //       "SELECT * FROM ticket WHERE ticket_number = ?",
// //       [ticket_number]
// //     );

// //     if (rows.length === 0) {
// //       return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
// //     }

// //     const ticket = rows[0];

// //    if (ticket.status !== "claimed") {
// //   return NextResponse.json(
// //     { message: "Only claimed tickets can be marked as done." },
// //     { status: 400 }
// //   );
// // }


// //     // Update ticket status to "done"
// // await pool.execute(
// //   "UPDATE ticket SET status = ?, claimed_by = ?, claimed_at = NOW() WHERE ticket_number = ?",
// //   ["done", userId, ticket_number]
// // );


// //    return NextResponse.json(
// //   { message: "Ticket marked as done successfully" },
// //   { status: 200 }
// // );

// //   } catch (error) {
// //     console.error("Error claiming ticket:", error);
// //     return NextResponse.json(
// //       { message: "Internal server error" },
// //       { status: 500 }
// //     );
// //   }
// // }
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
//   { params }: { params: Promise<{ ticket_number: string }> }
// ) {
//   // Await the params to get the actual ticket_number
//   const { ticket_number } = await params;  // Await here

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

//     if (ticket.status !== "claimed") {
//       return NextResponse.json(
//         { message: "Only claimed tickets can be marked as done." },
//         { status: 400 }
//       );
//     }

//     // Update ticket status to "done"
//     await pool.execute(
//       "UPDATE ticket SET status = ?, claimed_by = ?, claimed_at = NOW() WHERE ticket_number = ?",
//       ["done", userId, ticket_number]
//     );

//     return NextResponse.json(
//       { message: "Ticket marked as done successfully" },
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
import { NextRequest, NextResponse } from "next/server";
// import { getPool } from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import nodemailer from "nodemailer"; // Import nodemailer
import { getPool } from "@/app/lib/database/db";

type Ticket = {
  ticket_number: string;
  email: string;
  concern: string;
  date_created: string;
  status: string;
  claimed_by?: number;
  claimed_at?: string;
};

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ ticket_number: string }> }
) {
  // Await the params to get the actual ticket_number
  const { ticket_number } = await params;

  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required to claim ticket." },
      { status: 400 }
    );
  }

  try {
    const pool = getPool();

    // Check if ticket exists
    const [rows] = await pool.execute<RowDataPacket[] & Ticket[]>(
      "SELECT * FROM cro_ticket WHERE ticket_number = ?",
      [ticket_number]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    const ticket = rows[0];

    if (ticket.status !== "claimed") {
      return NextResponse.json(
        { message: "Only claimed tickets can be marked as done." },
        { status: 400 }
      );
    }

    // Update ticket status to "done"
    await pool.execute(
      "UPDATE cro_ticket SET status = ?, claimed_by = ?, claimed_at = NOW() WHERE ticket_number = ?",
      ["done", userId, ticket_number]
    );

    // Send email notification using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use your email service provider
      auth: {
        user: process.env.SMTP_USER,  // Your email user (environment variable)
        pass: process.env.SMTP_PASS,  // Your email password (environment variable)
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"Support Team" <${process.env.SMTP_USER}>`, // Sender address
      to: ticket.email,  // Recipient address (ticket email)
      subject: `Ticket #${ticket_number} Marked as Done`, // Subject line
      html: `
        <p>Hello,</p>
        <p>Your ticket <strong>#${ticket_number}</strong> has been marked as <strong>done</strong> by the support team.</p>
        <p>If you have any further concerns, feel free to reach out.</p>
        <p>Thank you for your patience!</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Ticket marked as done successfully and email sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error marking ticket as done:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

