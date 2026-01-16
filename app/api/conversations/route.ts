import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Token missing" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const skip = searchParams.get("skip") || "0";
    const limit = searchParams.get("limit") || "20";

    const res = await fetch(
      `http://44.206.101.8/api/v1/admin/conversations?skip=${skip}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to fetch conversations", data },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch Conversations Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error?.message },
      { status: 500 }
    );
  }
}



