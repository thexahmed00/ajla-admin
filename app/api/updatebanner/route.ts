import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...payload } = body;

    console.log("UPDATE BANNER ID:", id);
    console.log("UPDATE BANNER PAYLOAD:", payload);

    if (!id) {
      return NextResponse.json(
        { message: "Banner id is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `http://44.206.101.8/api/v1/content/admin/banners/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.get("authorization") || "",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    console.log("UPDATE BANNER RESPONSE:", data);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("UPDATE BANNER ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
