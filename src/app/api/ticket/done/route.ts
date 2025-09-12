// src/app/api/tickets/route.ts
import { getPool } from "@/app/lib/database/db";
import { NextResponse } from "next/server";
// import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
const [rows] = await pool.execute(
      "SELECT ticket_number, email, concern, date_created, status FROM cro_ticket WHERE status = 'solved' ORDER BY date_created DESC"
    );
    // const [rows] = await pool.execute("SELECT ticket_number, email, concern, date_created, status FROM ticket ORDER BY date_created DESC");
    const tickets = rows as {
      ticket_number: string;
      email: string;
      concern: string;
      date_created: string;
    }[];

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Fetch tickets error:", error);
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}
