// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import nodemailer from "nodemailer";
// import { google } from "googleapis";
// import { getPool } from "@/app/lib/database/db";

// const {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_REDIRECT_URI,
//   GOOGLE_REFRESH_TOKEN,
//   SENDER_EMAIL,
// } = process.env;

// const oAuth2Client = new google.auth.OAuth2(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

// export async function POST(req: NextRequest) {
//   try {
//     const { userId, newPassword } = await req.json();

//     if (!userId || !newPassword) {
//       return NextResponse.json({ error: "userId and newPassword are required" }, { status: 400 });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//     const pool = getPool();
//     await pool.execute("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);

//     // Prepare OAuth2 email transport
//     const accessToken = (await oAuth2Client.getAccessToken())?.token;
//     if (!accessToken) {
//       return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: SENDER_EMAIL,
//         clientId: GOOGLE_CLIENT_ID,
//         clientSecret: GOOGLE_CLIENT_SECRET,
//         refreshToken: GOOGLE_REFRESH_TOKEN,
//         accessToken,
//       },
//     });

//     const mailOptions = {
//       from: `Support <${SENDER_EMAIL}>`,
//       to: (await pool.execute("SELECT email FROM users WHERE id = ?", [userId]))[0][0].email,
//       subject: "Your password has been reset",
//       text: `Your password has been reset. Your new password is: ${newPassword}`,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ message: "Password updated and emailed successfully" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import nodemailer from "nodemailer";
// import { getPool } from "@/app/lib/database/db";

// const {
//   SMTP_USER,
//   SMTP_PASS,
// } = process.env;

// export async function POST(req: NextRequest) {
//   try {
//     const { userId, newPassword } = await req.json();

    

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//     const pool = getPool();
//     await pool.execute("UPDATE users SET password = ? WHERE id = ?", [
//       hashedPassword,
//       userId,
//     ]);

//     // Fetch email of user
//     const [rows] = await pool.execute("SELECT email FROM users WHERE id = ?", [userId]);
//     const user = (rows as { email: string }[])[0];

//     if (!user?.email) {
//       return NextResponse.json({ error: "User email not found" }, { status: 404 });
//     }

//     // Nodemailer with service only (e.g., Gmail)
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // Or use "outlook", "yahoo", etc.
//       auth: {
//         user: SMTP_USER,
//         pass: SMTP_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `Support <${SMTP_USER}>`,
//       to: user.email,
//       subject: "Your password has been reset",
//       text: `Hello,\n\nYour password has been successfully reset.\n\nNew Password: ${newPassword}\n\nPlease change it after logging in.`,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ message: "Password updated and emailed successfully" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { getPool } from "@/app/lib/database/db";

const {
  SMTP_USER,
  SMTP_PASS,
  
} = process.env;

// Generate random password function
function generateRandomPassword(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const pool = getPool();

    // Check if user exists
    const [rows] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
    const user = (rows as { id: number }[])[0];

    if (!user) {
      return NextResponse.json({ error: "User with this email not found" }, { status: 404 });
    }

    // Generate new random password
    const newPassword = generateRandomPassword();

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password in DB
    await pool.execute("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      user.id,
    ]);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Send email with new password
    await transporter.sendMail({
      from: `Support <${ SMTP_USER}>`,
      to: email,
      subject: "Your password has been reset",
      text: `Hello,\n\nYour password has been reset. Your new password is:\n\n${newPassword}\n\nPlease change it after logging in.\n\nBest regards,\nSupport Team`,
    });

    return NextResponse.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
