import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher)
      throw new NextResponse("Unauthorized", { status: 500 });

    //

    const values = await request.json();

    for (let i of values) {
      await prisma.chapter.update({
        where: {
          id: i.id,
          courseId: params.courseId,
        },
        data: {
          position: i.position,
        },
      });
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("[CREATE_CHAPTERS]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher)
      throw new NextResponse("Unauthorized", { status: 500 });

    //

    const values = await request.json();

    const allChapters = await prisma.chapter.findMany({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const position = allChapters.length > 0 ? +allChapters[0].position + 1 : 1;

    const chapter = await prisma.chapter.create({
      data: {
        courseId: params.courseId,
        position,
        ...values,
      },
    });

    return NextResponse.json({ status: "success", data: chapter });
  } catch (err) {
    console.log("[CREATE_CHAPTERS]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
