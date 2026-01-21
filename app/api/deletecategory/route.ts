import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { message: "Category id required" },
        { status: 400 }
      );
    }

    const authHeader = req.headers.get("authorization");

    const res = await fetch(
      `http://44.206.101.8/api/v1/admin/services/categories/${id}`,
      {
        method: "DELETE",
        headers: {
          ...(authHeader && { Authorization: authHeader }),
        },
      }
    );

    // ✅ HANDLE EMPTY BODY SAFELY
    if (res.status === 204) {
      return NextResponse.json(
        { message: "Category deleted successfully" },
        { status: 200 }
      );
    }

    const contentType = res.headers.get("content-type");
    let data = null;

    if (contentType?.includes("application/json")) {
      data = await res.json();
    }

    return NextResponse.json(
      data ?? { message: "Category deleted successfully" },
      { status: res.status }
    );
  } catch (err) {
    console.error("Delete category error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
