import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// Initialize ImageKit only if all required environment variables are present
const initializeImageKit = () => {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    return null;
  }

  return new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });
};

const imagekit = initializeImageKit();

export async function GET() {
  if (!imagekit) {
    return NextResponse.json(
      { message: "ImageKit is not configured" },
      { status: 500 }
    );
  }

  const authParams = imagekit.getAuthenticationParameters();
  return NextResponse.json(authParams);
}
