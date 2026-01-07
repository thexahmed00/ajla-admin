import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch("http://44.206.101.8/api/v1/services/vendors?skip=0&limit=20", {
    headers: {
      Authorization: authHeader,
      Accept: "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
