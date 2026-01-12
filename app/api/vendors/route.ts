import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category_slug = searchParams.get("category_slug") || " ";
  const skip = searchParams.get("skip") || "0";
  const limit = searchParams.get("limit") || "20";

  const apiUrl = `http://44.206.101.8/api/v1/admin/services/vendors?category_slug=${category_slug}&skip=${skip}&limit=${limit}`;

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: authHeader,
      Accept: "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}



export async function POST(req: Request) {
  try {
    console.log("post api called")
    const body = await req.json();
    const token = body?.token; // we will pass token separately
    delete body.token;
    console.log("api body",body)
    const apiRes = await fetch(`http://44.206.101.8/api/v1/admin/services/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return NextResponse.json(
        { message: data?.message || "Vendor create failed" },
        { status: apiRes.status }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}






