import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const token = body?.token;
    console.log("api body",body)
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - Missing Token" },
        { status: 401 }
      );
    }

    delete body.token;

    if (!body?.id) {
      return NextResponse.json(
        { message: "Vendor ID is required" },
        { status: 400 }
      );
    }

    const apiRes = await fetch(
      `http://44.206.101.8/api/v1/admin/services/vendors/${body.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return NextResponse.json(
        { message: data?.message || "Vendor update failed", data },
        { status: apiRes.status }
      );
    }

    return NextResponse.json(
      { success: true, vendor: data },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("🔥 Update Vendor Error:", err);

    return NextResponse.json(
      { message: "Internal Server Error", error: err?.message },
      { status: 500 }
    );
  }
}
