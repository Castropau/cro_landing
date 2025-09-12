import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { firstname, toEmail } = await req.json();

  if (!firstname || !toEmail) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use any service or SMTP settings
      auth: {
        user: process.env.SMTP_USER, // your email (from env)
        pass: process.env.SMTP_PASS, // your app password (not actual password)
      },
    });

    // Define email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: toEmail,
      subject: "Your Ticket Was Claimed",
      text: `Hello, your ticket has been claimed by ${firstname}.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}