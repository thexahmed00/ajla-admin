import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const token = req.headers.get("authorization");
    const body = await req.json();

    const { id, ...payload } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Plan id is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `http://44.206.101.8/api/v1/admin/plans/${id}`,
      {
        method: "PUT", // or PATCH if backend supports it
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update plan" },
      { status: 500 }
    );
  }
}
