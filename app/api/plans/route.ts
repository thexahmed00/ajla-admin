import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(`http://44.206.101.8/api/v1/admin/plans`, {
      headers: {
        Authorization: authHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch plans" },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("GET plans data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET plans error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}



export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();

    const res = await fetch(`http://44.206.101.8/api/v1/admin/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create plan" },
      { status: 500 }
    );
  }
}
