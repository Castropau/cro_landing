// src/app/api/tickets/claim_ticket/route.ts

import { getPool } from "@/app/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
// import { getPool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const pool = getPool();
    const [rows] = await pool.execute(
      `SELECT ticket_number, email, concern, date_created, status 
       FROM cro_ticket 
       WHERE status = 'claimed' AND claimed_by = ?
       ORDER BY date_created DESC`,
      [userId]
    );

    const tickets = rows as {
      ticket_number: string;
      email: string;
      concern: string;
      date_created: string;
      status: string;
    }[];

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error fetching claimed tickets:", error);
    return NextResponse.json({ error: "Failed to fetch claimed tickets" }, { status: 500 });
  }
}
