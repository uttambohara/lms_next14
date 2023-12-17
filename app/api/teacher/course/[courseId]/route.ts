import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string } },
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

    const values = await request.json();

    const course = await prisma.course.update({
      where: {
        id: params.courseId,
      },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher(userId))
      throw new NextResponse("Unauthorized", { status: 500 });

    //

    const purchased = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });

    if (purchased) {
      await prisma.purchase.delete({
        where: {
          id: purchased?.id,
          userId,
          courseId: params.courseId,
        },
      });
    }

    const course = await prisma.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json({ status: "success", data: course });
  } catch (err) {
    console.log("[CHAPTER_DELETE]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
