import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Category, Chapter, Course } from "@prisma/client";
import getProgress from "./get-progress";

type CourseWithProgressAndCategory = Course & {
  chapters: Chapter[];
  category: Category;
  progress?: number | null;
};

export default async function getDashboardCourse() {
  try {
    const { userId } = auth();

    if (!userId) throw new Error("User doesn't exit...");

    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: {
          include: {
            chapters: true,
            category: true,
          },
        },
      },
    });

    const allPurchased = purchases.map(
      (purchase) => purchase.course,
    ) as CourseWithProgressAndCategory[];

    for (let course of allPurchased) {
      const courseId = course?.id!;
      const allProgress = await getProgress({ userId, courseId });

      (course as any)["progress"] = allProgress;
    }

    const completedCourse = allPurchased.filter(
      (course) => course.progress === 100,
    );

    const uncompletedCourse = allPurchased.filter(
      (course) => (course.progress ?? 0) < 100,
    );

    return { completedCourse, uncompletedCourse };
  } catch (err) {
    console.log(err);
    return {
      completedCourse: [],
      uncompletedCourse: [],
    };
  }
}
