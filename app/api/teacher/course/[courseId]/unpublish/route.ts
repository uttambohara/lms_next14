import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: { courseId: string };
  },
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher)
      throw new NextResponse("Unauthorized", { status: 500 });

    //
    const courseOwn = await prisma.course.findUnique({
      where: {
        userId,
        id: params.courseId,
      },
    });

    if (!courseOwn) throw new NextResponse("Unauthorized", { status: 500 });

    await prisma.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("[COURSE_PUBLISHED]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
