import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, name, icon_url } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Category id is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `http://44.206.101.8/api/v1/admin/services/categories/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // pass Bearer token as-is
        },
        body: JSON.stringify({
          name,
          icon_url,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Update failed" },
        { status: res.status }
      );
    }

    return NextResponse.json(
      {
        message: "Category updated successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Category update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
