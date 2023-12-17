import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export default async function getAnalytics() {
  try {
    const { userId } = auth();

    if (!userId) throw new Error("Teacher doesn't exist...");

    // All published courses of current user
    const allPurchases = await prisma.purchase.findMany({
      include: {
        course: {
          where: {
            userId,
          },
        },
      },
    });

    const allCourses = allPurchases.map((purchase) => purchase.course);
    const totalSales = allCourses.length;
    const totalRevenue = allCourses.reduce((acc, item) => {
      console.log(item?.price);
      return acc + item?.price!;
    }, 0);

    const courseAndTotal: Record<string, number> = {};

    allCourses.map((course) => {
      const titleOfTheCourse = course?.title!;

      if (!courseAndTotal[titleOfTheCourse]) {
        courseAndTotal[titleOfTheCourse] = 0;
      }
      courseAndTotal[titleOfTheCourse] += course?.price!;
    });

    //

    const formattedCourseAndTotal = Object.entries(courseAndTotal).map(
      ([title, total]) => ({
        name: title,
        total: total,
      }),
    );

    return { formattedCourseAndTotal, totalSales, totalRevenue };
  } catch (err) {
    console.log(err);
  }
}
