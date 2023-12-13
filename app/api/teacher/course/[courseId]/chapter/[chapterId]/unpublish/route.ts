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
  }
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher)
      throw new NextResponse("Unauthorized", { status: 500 });

    //

    await prisma.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    // Changing course isPublished based on chapter
    const publishedChapters = await prisma.chapter.findMany({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (publishedChapters.length === 0) {
      await prisma.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("[CHAPTER_UN-PUBLISHED]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
