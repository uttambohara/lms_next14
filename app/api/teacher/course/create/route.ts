import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId))
      throw new NextResponse("Unauthorized", { status: 500 });

    //

    const values = await request.json();

    const course = await prisma.course.create({
      data: {
        userId,
        ...values,
      },
    });

    return NextResponse.json({ status: "success", data: course });
  } catch (err) {
    console.log("[CREATE_COURSE]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
