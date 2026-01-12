import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Vendor ID is required" },
        { status: 400 }
      );
    }

    const token =
      request.headers.get("authorization")?.replace("Bearer ", "") ?? "";

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - Missing Token" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `http://44.206.101.8/api/v1/admin/services/vendors/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to fetch vendor", data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
}
