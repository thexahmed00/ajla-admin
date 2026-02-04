import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Plan id is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `http://44.206.101.8/api/v1/admin/plans/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token || "",
        },
      }
    );

    // ✅ Backend returns 204 No Content
    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    // For safety if backend ever returns body
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete plan" },
      { status: 500 }
    );
  }
}
