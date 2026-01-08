import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Incoming Body:", body);

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    console.log("Token Exists:", !!token);

    const { name, icon_url } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
      .trim();

    const payload = {
      slug,
      name: name.trim(),
      display_order: 0,
      icon_url: icon_url || ""
    };

    console.log("Payload sent to backend:", payload);

    const res = await fetch(
      "http://44.206.101.8/api/v1/admin/services/categories",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const data = await res.json();
    console.log("Backend Response:", data);

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to create category", data },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Category Created Successfully", data },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Create Category Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error?.message },
      { status: 500 }
    );
  }
}




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

    const res = await fetch(
      "http://44.206.101.8/api/v1/services/categories",
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
    console.log("Categories Response:", data);

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to fetch categories", data },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Success", categories: data.categories || [] },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Fetch Categories Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error?.message },
      { status: 500 }
    );
  }
}
