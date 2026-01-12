import { NextResponse } from "next/server";
import { headers } from "next/headers";


export async function GET() {
  try {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    console.log(authHeader)

    if (!authHeader) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [vendorsRes, categoriesRes] = await Promise.all([
      // fetch("http://44.206.101.8/api/v1/admin/conversations?skip=0&limit=20", {
      //   method: "GET",
      //   headers: {
      //     authorization: authHeader, 
      //     Authorization: authHeader,
      //   },
      // }),
      fetch("http://44.206.101.8/api/v1/services/vendors?skip=0&limit=20"),
      fetch("http://44.206.101.8/api/v1/services/categories"),
    ]);

    // const conversationsData = await conversationsRes.json();
    const vendorsData = await vendorsRes.json();
    const categoriesData = await categoriesRes.json();
    // console.log("Dashboard fetched data:", conversationsData)
    return NextResponse.json({
      // totalConversations: conversationsData.total ?? 0,
      activeVendors: vendorsData.total ?? vendorsData.vendors?.length ?? 0,
      serviceCategories: categoriesData.categories?.length ?? 0,
      availability: "24/7",
      // conversations: conversationsData.conversations ?? [],
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return NextResponse.json(
      { message: "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}
