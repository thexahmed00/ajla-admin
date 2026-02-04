import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Banner ID is required" },
        { status: 400 }
      );
    }

    // get token from headers
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization token missing" },
        { status: 401 }
      );
    }

    const res = await fetch(
      `http://44.206.101.8/api/v1/content/admin/banners/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader, // forward token
        },
      }
    );

    // API returns 204 with plain string
    if (res.status === 204) {
      return NextResponse.json("Banner deleted successfully", { status: 200 });
    }

    const text = await res.text();

    return NextResponse.json(
      { success: false, message: text },
      { status: res.status }
    );
  } catch (error) {
    console.error("Delete banner error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
