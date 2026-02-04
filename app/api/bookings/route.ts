import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "upcoming";
    console.log("Status param:", status);
    const token =
      request.headers.get("authorization")?.replace("Bearer ", "") ?? "";

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - Missing Token" },
        { status: 401 }
      );
    }

    const backendRes = await fetch(
      `http://44.206.101.8/api/v1/admin/bookings?status=${status}&skip=0&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          message: data?.message || "Failed to fetch bookings",
          data,
        },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
