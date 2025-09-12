// import { NextResponse } from "next/server";
// import { getPool } from "@/lib/db"; // Your MySQL connection pool

// export async function POST(request: Request) {
//   try {
//     const { email, concern } = await request.json();

//     if (!email || !concern) {
//       return NextResponse.json({ error: "Email and concern are required" }, { status: 400 });
//     }

//     const pool = getPool();

//     // Insert into your MySQL `tickets` table (adjust as needed)
//     await pool.execute(
//       "INSERT INTO ticket (email, concern) VALUES (?, ?)",
//       [email, concern]
//     );

//     return NextResponse.json({ success: true, message: "Ticket submitted successfully" });
//   } catch (error) {
//     console.error("Ticket API error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import { getPool } from "@/lib/db";

// function generateTicketNumber(): string {
//   const prefix = "TCKT";
//   const random = Math.random().toString(36).substring(2, 10).toUpperCase();
//   return `${prefix}-${random}`;
// }

// export async function POST(request: Request) {
//   try {
//     const { email, concern } = await request.json();

//     if (!email || !concern) {
//       return NextResponse.json({ error: "Email and concern are required" }, { status: 400 });
//     }

//     const pool = getPool();
//     const ticketNumber = generateTicketNumber();

//     await pool.execute(
//       "INSERT INTO ticket (ticket_number, email, concern, status) VALUES (?, ?, ?, ?)",
//       [ticketNumber, email, concern, 'pending']
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Ticket submitted successfully",
//       ticket_number: ticketNumber,
//     });
//   } catch (error) {
//     console.error("Ticket API error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }





// now
// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import { getPool } from "@/lib/db";

// function generateTicketNumber(): string {
//   const prefix = "TCKT";
//   const random = Math.random().toString(36).substring(2, 10).toUpperCase();
//   return `${prefix}-${random}`;
// }

// export async function POST(request: Request) {
//   try {
//     const { email, concern } = await request.json();

//     if (!email || !concern) {
//       return NextResponse.json(
//         { error: "Email and concern are required" },
//         { status: 400 }
//       );
//     }

//     const pool = getPool();
//     const ticketNumber = generateTicketNumber();

//     // Insert ticket into DB
//     await pool.execute(
//       "INSERT INTO ticket (ticket_number, email, concern, status) VALUES (?, ?, ?, ?)",
//       [ticketNumber, email, concern, "pending"]
//     );

//     // Configure mail transport
//     const transporter = nodemailer.createTransport({
//       service: "gmail", 
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: process.env.SMTP_USER,
//       to: email,
//       subject: "Your Ticket Has Been Created",
//       text: `Hello,\n\nYour support ticket has been successfully created.\n\nTicket Number: ${ticketNumber}\nConcern: ${concern}\n\nWe will update you once it is processed.\n\nThank you,\nSupport Team`,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({
//       success: true,
//       message: "Ticket submitted successfully. Confirmation email sent.",
//       ticket_number: ticketNumber,
//     });
//   } catch (error) {
//     console.error("Ticket API error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import { getPool } from "@/lib/db";

// function generateTicketNumber(): string {
//   const prefix = "TCKT";
//   const random = Math.random().toString(36).substring(2, 10).toUpperCase();
//   return `${prefix}-${random}`;
// }

// export async function POST(request: Request) {
//   try {
//     const { email, concern } = await request.json();

//     if (!email || !concern) {
//       return NextResponse.json(
//         { error: "Email and concern are required" },
//         { status: 400 }
//       );
//     }

//     const pool = getPool();
//     const ticketNumber = generateTicketNumber();

//     const [rows] = await pool.execute(
//       `SELECT COUNT(*) AS ticket_count FROM ticket 
//        WHERE email = ? AND DATE(date_created) = CURDATE()`,
//       [email]
//     );

//     const ticketCount = rows[0].ticket_count;

//     if (ticketCount >= 5) {
//       return NextResponse.json(
//         { error: "You have reached the daily limit of 5 tickets." },
//         { status: 429 }
//       );
//     }

//     await pool.execute(
//       "INSERT INTO ticket (ticket_number, email, concern, status, date_created) VALUES (?, ?, ?, ?, NOW())",
//       [ticketNumber, email, concern, "pending"]
//     );

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

    
//     const mailOptions = {
//       from: process.env.SMTP_USER,
//       to: email,
//       subject: "Your Ticket Has Been Created",
//       text: `Hello,\n\nYour support ticket has been successfully created.\n\nTicket Number: ${ticketNumber}\nConcern: ${concern}\n\nWe will update you once it is processed.\n\nThank you,\nSupport Team`,
//     };

   
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({
//       success: true,
//       message: "Ticket submitted successfully. Confirmation email sent.",
//       ticket_number: ticketNumber,
//     });
//   } catch (error) {
//     console.error("Ticket API error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import { getPool } from "@/lib/db";
// import nodemailer from "nodemailer";

// // Define the shape of the query result
// interface TicketCountResult {
//   ticket_count: number;
// }
// function generateTicketNumber(): string {
//   const prefix = "TCKT";
//   const random = Math.random().toString(36).substring(2, 10).toUpperCase();
//   return `${prefix}-${random}`;
// }
// export async function POST(request: Request) {
//   try {
//     const { email, concern } = await request.json();

//     if (!email || !concern) {
//       return NextResponse.json(
//         { error: "Email and concern are required" },
//         { status: 400 }
//       );
//     }

//     const pool = getPool();
//     const ticketNumber = generateTicketNumber();

//     // Get the number of tickets submitted by the user today
//     const [rows] = await pool.execute(
//       `SELECT COUNT(*) AS ticket_count FROM ticket 
//        WHERE email = ? AND DATE(date_created) = CURDATE()`,
//       [email]
//     );

//     // Type assertion to ensure `rows` is typed as `TicketCountResult[]`
//     const ticketCount = (rows as TicketCountResult[])[0].ticket_count;

//     // Limit the number of tickets to 5 per day
//     if (ticketCount >= 5) {
//       return NextResponse.json(
//         { error: "You have reached the daily limit of 5 tickets." },
//         { status: 429 }
//       );
//     }

//     // Insert ticket into DB with the current timestamp
//     await pool.execute(
//       "INSERT INTO ticket (ticket_number, email, concern, status, date_created) VALUES (?, ?, ?, ?, NOW())",
//       [ticketNumber, email, concern, "pending"]
//     );

//     // Configure mail transport
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: process.env.SMTP_USER,
//       to: email,
//       subject: "Your Ticket Has Been Created",
//       text: `Hello,\n\nYour support ticket has been successfully created.\n\nTicket Number: ${ticketNumber}\nConcern: ${concern}\n\nWe will update you once it is processed.\n\nThank you,\nSupport Team`,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({
//       success: true,
//       message: "Ticket submitted successfully. Confirmation email sent.",
//       ticket_number: ticketNumber,
//     });
//   } catch (error) {
//     console.error("Ticket API error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { getPool } from "@/app/lib/database/db";

interface TicketCountResult {
  ticket_count: number;
}

function generateTicketNumber(): string {
  const prefix = "TCKT";
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}-${random}`;
}
export async function POST(request: Request) {
  try {
    const { email, concern } = await request.json();

    if (!email || !concern) {
      return NextResponse.json(
        { error: "Email and concern are required" },
        { status: 400 }
      );
    }

    const pool = getPool();
    const ticketNumber = generateTicketNumber();

    const [rows] = await pool.execute(
      `SELECT COUNT(*) AS ticket_count FROM cro_ticket 
       WHERE email = ? AND DATE(date_created) = CURDATE()`,
      [email]
    );

    const ticketCount = (rows as TicketCountResult[])[0].ticket_count;

    if (ticketCount >= 5) {
      return NextResponse.json(
        { error: "You have reached the daily limit of 5 tickets." },
        { status: 429 }
      );
    }

    await pool.execute(
      "INSERT INTO cro_ticket (ticket_number, email, concern, status, date_created) VALUES (?, ?, ?, ?, NOW())",
      [ticketNumber, email, concern, "pending"]
    );

    return NextResponse.json({
      success: true,
      message: "Ticket submitted successfully. Confirmation email sent.",
      ticket_number: ticketNumber,
    });
  } catch (error) {
    console.error("Ticket API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


