// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import { getPool } from "@/lib/db";

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password required" }, { status: 400 });
//     }

//     const pool = getPool();
//     const [rows] = await pool.execute(
//       "SELECT id, email, password FROM users WHERE email = ?",
//       [email]
//     );
//     const users = rows as { id: number; email: string; password: string }[];

//     if (users.length === 0) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//     }

//     const user = users[0];

//     const isValid = await bcrypt.compare(password, user.password);

//     if (!isValid) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//     }

//     return NextResponse.json({ message: "Login successful" });
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// // import { getPool } from "@/lib/db";
// import { cookies } from "next/headers"; // ✅ Import cookies
//  import crypto from "crypto";
// import { getPool } from "@/app/lib/database/db";

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password required" }, { status: 400 });
//     }

//     const pool = getPool();
//     const [rows] = await pool.execute(
//       "SELECT id, email, password, firstname FROM users WHERE email = ?",
//       [email]
//     );
//     const users = rows as { id: number; email: string; password: string, firstname: string }[];

//     if (users.length === 0) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//     }

//     const user = users[0];
//     const isValid = await bcrypt.compare(password, user.password);

//     if (!isValid) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//     }

//     // ✅ Set cookie (simple token or just user ID for now)
//     // (await
//     //       // ✅ Set cookie (simple token or just user ID for now)
//     //       cookies()).set("token", String(user.id), {
//     //   httpOnly: true,
//     //   path: "/",
//     //   maxAge: 60 * 60 * 24, // 1 day
//     // });
   
// console.log("User ID:", user.id);

// // const token = crypto.randomBytes(32).toString("hex");

// // (await cookies()).set("token", token, {
// //   httpOnly: true,
// //   path: "/",
// //   secure: true,
// //   maxAge: 60 * 60 * 24, // 1 day
// // });
// const token = crypto.randomBytes(32).toString("hex");

// (await cookies()).set("token", token, {
//   httpOnly: true,
//   path: "/",
//   maxAge: 60 * 60 * 24, // 1 day
// });

//     // return NextResponse.json({ message: "Login successful" });
//     return NextResponse.json({ 
//   message: "Login successful", 
//   user: { id: user.id, email: user.email, firstname: user.firstname } // Include any other necessary data
// });

//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
// app/api/auth/login_and_cleanup/route.ts

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getPool } from "@/app/lib/database/db";
import { cookies } from "next/headers";
import crypto from "crypto";
import { google } from "googleapis";

const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI,
  GMAIL_REFRESH_TOKEN,
} = process.env;

// if (
//   !GMAIL_CLIENT_ID ||
//   !GMAIL_CLIENT_SECRET ||
//   !GMAIL_REDIRECT_URI ||
//   !GMAIL_REFRESH_TOKEN
// ) {
//   throw new Error("Missing Gmail OAuth environment variables");
// }

const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const pool = getPool();
    const [rows] = await pool.execute(
      "SELECT id, email, password, firstname FROM users WHERE email = ?",
      [email]
    );
    const users = rows as { id: number; email: string; password: string; firstname: string }[];

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Set login token
    const token = crypto.randomBytes(32).toString("hex");
    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    // ** Delete the reset password email **

    const resetSubject = "Your password has been reset";  
    // ensure this matches the subject exactly

    // Primary query
    let query = `to:${email} subject:"${resetSubject}" in:sent`;
    let listRes = await gmail.users.messages.list({
      userId: "me",
      q: query,
      maxResults: 20,
      includeSpamTrash: true,
    });

    let messageIds = listRes.data.messages
      ?.map(m => m.id)
      .filter((id): id is string => typeof id === "string") || [];

    // If no messages found, try broader query
    if (messageIds.length === 0) {
      query = `subject:"${resetSubject}"`;
      listRes = await gmail.users.messages.list({
        userId: "me",
        q: query,
        maxResults: 20,
        includeSpamTrash: true,
      });
      messageIds = listRes.data.messages
        ?.map(m => m.id)
        .filter((id): id is string => typeof id === "string") || [];
    }

    console.log("Messages to delete:", messageIds);

    if (messageIds.length > 0) {
      const deleteRes = await gmail.users.messages.batchDelete({
        userId: "me",
        requestBody: { ids: messageIds },
      });
      console.log("Batch delete result:", deleteRes.data);
    } else {
      console.log("No reset email found to delete for:", email);
    }

    // End deletion logic

    return NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, firstname: user.firstname },
    });
  } catch (err) {
    console.error("Login + email deletion error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


