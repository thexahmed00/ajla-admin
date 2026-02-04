import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get token from request headers (sent by frontend)
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch users from external API
    const apiRes = await fetch(
      "http://44.206.101.8/api/v1/admin/users?skip=0&limit=20",
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    if (!apiRes.ok) {
      const errorData = await apiRes.json();
      return NextResponse.json(
        { message: "Failed to fetch users", details: errorData },
        { status: apiRes.status }
      );
    }

    const data = await apiRes.json();

    // Return JSON directly
    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 }
    );
  }
}



const BASE_URL = "http://44.206.101.8/api/v1/admin/users";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Read is_admin from form data
    const isAdmin = body.is_admin ?? false;

    // Remove is_admin from body if backend expects it via query
    // (optional – depends on backend)
    // delete body.is_admin;

    const url = `${BASE_URL}?is_admin=${isAdmin}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          message: data?.message || "Failed to create user",
          error: data,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Create user error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
