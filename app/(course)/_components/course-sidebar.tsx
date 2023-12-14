import { Chapter, ChapterProgress, Course } from "@prisma/client";
import CourseSidebarList from "./course-sidebar-list";

type CourseSidebarProps = {
  course: Course & {
    chapters: (Chapter & { chapterProgress: ChapterProgress[] })[];
  };
};

export default async function CourseSidebar({ course }: CourseSidebarProps) {
  return (
    <aside className="hidden lg:flex border-r border-gray-100 row-span-full py-4 md:gap-3 md:flex-col">
      <h2 className="text-[1rem] font-bold p-4 leading-2 font-sans">
        {course.title}
      </h2>

      <CourseSidebarList course={course} />
    </aside>
  );
}
