import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: { courseId: string; chapterId: string };
  },
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId))
      throw new NextResponse("Unauthorized", { status: 500 });

    //
    const courseOwn = await prisma.course.findUnique({
      where: {
        userId,
        id: params.courseId,
      },
    });

    if (!courseOwn) throw new NextResponse("Unauthorized", { status: 500 });

    await prisma.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("[CHAPTER_PUBLISHED]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
