import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher)
      throw new NextResponse("Unauthorized", { status: 500 });

    const { id } = await request.json();

    console.log({ id }, "Working.//////");

    if (!id) {
      await prisma.chapterProgress.create({
        data: {
          userId,
          chapterId: params.chapterId,
          isCompleted: true,
        },
      });
    } else {
      await prisma.chapterProgress.update({
        where: {
          id,
          userId,
          chapterId: params.chapterId,
        },
        data: {
          isCompleted: true,
        },
      });
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("[COMPLETE_CHAPTER]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
