import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
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

    const attachment = await prisma.attachment.create({
      data: {
        name: values.url.split("/").pop(),
        courseId: params.courseId,
        ...values,
      },
    });

    return NextResponse.json({ status: "success", data: attachment });
  } catch (err) {
    console.log("[COURSE_ATTACHMENT_ADD]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
