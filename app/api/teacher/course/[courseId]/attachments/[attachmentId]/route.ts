import { isTeacher } from "@/lib/is-teacher";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId || !isTeacher)
      throw new NextResponse("Unauthorized", { status: 500 });

    //

    const attachment = await prisma.attachment.delete({
      where: {
        id: params.attachmentId,
        courseId: params.courseId,
      },
    });

    return NextResponse.json({ status: "success", data: attachment });
  } catch (err) {
    console.log("[COURSE_ATTACHMENT_DELETE]", err);
    throw new NextResponse("Internal Error", { status: 500 });
  }
}
