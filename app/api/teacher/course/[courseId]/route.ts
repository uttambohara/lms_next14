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
