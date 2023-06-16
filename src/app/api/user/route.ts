import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany();
    if (!users) return NextResponse.json({ error: "No users found" });

    return NextResponse.json({ data: users });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, address } = body;
    console.log(name, email, address);

    if (body && email) {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          address,
        },
      });
      if (!user) return NextResponse.json({ error: "Error creating user" });
      return NextResponse.json({ data: user });
    }

    return NextResponse.json({ error: "User name and password required" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
