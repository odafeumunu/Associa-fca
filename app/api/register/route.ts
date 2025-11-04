import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("New registration:", data);
  // TODO: Save to DB or send email
  return NextResponse.json({ success: true, message: "Registration received" });
}
