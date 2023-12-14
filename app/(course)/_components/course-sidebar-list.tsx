import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Chapter, ChapterProgress, Course } from "@prisma/client";
import { redirect } from "next/navigation";
import ChapterItem from "./chapter-sidebar-item";

type CourseSidebarListProps = {
  course: Course & {
    chapters: (Chapter & { chapterProgress: ChapterProgress[] })[];
  };
};

export default async function CourseSidebarList({
  course,
}: CourseSidebarListProps) {
  const { userId } = auth();

  if (!userId) redirect("/");

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <ul className="px-3">
      {course.chapters.map((chapter) => (
        <ChapterItem
          key={chapter.id}
          chapter={chapter}
          courseId={course.id}
          isPurchased={purchase}
        />
      ))}
    </ul>
  );
}
