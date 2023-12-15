import getProgress from "@/actions/get-progress";
import CourseProgress from "@/components/ui/course-progress";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Chapter, ChapterProgress, Course } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import CourseSidebarList from "./course-sidebar-list";

type CourseSidebarProps = {
  course: Course & {
    chapters: (Chapter & { chapterProgress: ChapterProgress[] })[];
  };
};

export default async function CourseSidebar({ course }: CourseSidebarProps) {
  const { userId } = auth();

  if (!userId) redirect("/");

  const courseProgress = await getProgress({ courseId: course.id, userId });

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <aside className="row-span-full hidden border-r border-gray-100 py-4 md:flex-col md:gap-3 lg:flex">
      <div className="px-6 py-3 font-sans text-[1rem] font-bold">
        <h2 className="mb-4">{course.title}</h2>
        {Boolean(purchase) && (
          <CourseProgress
            value={courseProgress!}
            variant={courseProgress === 100 ? "success" : "default"}
          />
        )}
      </div>

      <div className="px-6 text-muted-foreground underline underline-offset-4">
        <Link href={`/browse`}>&larr; Browse other courses ...</Link>
      </div>

      <CourseSidebarList course={course} />
    </aside>
  );
}
