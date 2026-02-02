import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const res = await fetch(
      "http://44.206.101.8/api/v1/content/banners",
      {
        headers: {
          Authorization: req.headers.get("authorization") || "",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET BANNERS ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
