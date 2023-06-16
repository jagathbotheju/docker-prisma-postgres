import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    if (!posts) return NextResponse.json({ error: "Posts Not Found" });

    return NextResponse.json({ data: posts });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
