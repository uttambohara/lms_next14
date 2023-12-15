import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress)
      return new NextResponse("Unauthorized", { status: 401 });

    const course = await prisma?.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const purchased = await prisma?.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchased)
      return new NextResponse("Already purchased", { status: 401 });

    if (!course) return new NextResponse("Already purchased", { status: 404 });
    // --------

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.log("COURSE_CHECKOUT", err);
  }
}
