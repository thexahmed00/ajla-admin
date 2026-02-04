// app/api/admin/banners/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      access_token,
      title,
      description,
      image_url,
      link_url,
      display_order,
      is_active,
    } = body;

    if (!access_token) {
      return NextResponse.json(
        { message: "Access token missing" },
        { status: 401 }
      );
    }

    const response = await fetch(
      "http://44.206.101.8/api/v1/content/admin/banners",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          title,
          description,
          image_url,
          link_url,
          display_order,
          is_active,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data?.message || "Failed to create banner" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Banner created successfully", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Banner Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
