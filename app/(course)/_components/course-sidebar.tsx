import getProgress from "@/actions/get-progress";
import { default as CourseProgress } from "@/components/ui/course-progress";
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
    <aside className="hidden lg:flex border-r border-gray-100 row-span-full py-4 md:gap-3 md:flex-col">
      <div className="text-[1rem] font-bold px-6 py-3 leading-2 font-sans">
        <h2 className="mb-4">{course.title}</h2>
        {Boolean(purchase) && (
          <CourseProgress
            value={courseProgress!}
            variant={courseProgress === 100 ? "success" : "default"}
          />
        )}
      </div>

      <div className="px-6 underline underline-offset-4 text-muted-foreground">
        <Link href={`/browse`}>&larr; browse other courses ...</Link>
      </div>

      <CourseSidebarList course={course} />
    </aside>
  );
}
