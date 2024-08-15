import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

// Define GET method for fetching video URL
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publicId = searchParams.get("publicId");

  if (!publicId) {
    return NextResponse.json({ error: "Invalid publicId" }, { status: 400 });
  }

  try {
    const videoUrl = cloudinary.url(publicId, {
      resource_type: "video",
      format: "mp4",
      secure: true,
    });

    return NextResponse.json({ url: videoUrl });
  } catch (error) {
    console.error("Failed to fetch video URL:", error);
    return NextResponse.json(
      { error: "Failed to fetch video URL" },
      { status: 500 },
    );
  }
}
