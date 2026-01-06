import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await fetch("http://44.206.101.8/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      access_token: data.access_token,
      expires_in: data.expires_in,
    });
  } catch {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
