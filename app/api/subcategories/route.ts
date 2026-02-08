import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const page = req.nextUrl.searchParams.get("page") || "1";

    const res = await fetch(
      `http://44.206.101.8/api/v1/admin/services/subcategories?page=${page}`,
      {
        headers: {
          Authorization: token,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch subcategories");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      category_id,
      slug,
      name,
      display_order,
      icon_url
    } = body;

    // Basic validation
    if (!category_id || !name || !slug) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔁 Call your backend API
    const res = await fetch(
      `http://44.206.101.8/api/v1/admin/services/subcategories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          category_id,
          slug,
          name,
          display_order,
          icon_url
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message || "Failed to create subcategory"
        },
        { status: res.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Subcategory created successfully",
        data
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subcategory POST error:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
