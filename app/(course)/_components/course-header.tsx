import HeaderButtons from "@/app/(dashboard)/_components/header/header-buttons";
import SidebarSheet from "@/components/sidebar-sheet";
import { Chapter, ChapterProgress, Course } from "@prisma/client";
import CourseSidebarList from "./course-sidebar-list";

type CourseHeaderProps = {
  course: Course & {
    chapters: (Chapter & { chapterProgress: ChapterProgress[] })[];
  };
};

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <header className="flex items-center border-b border-gray-200 px-4">
      <div className="lg:hidden">
        <SidebarSheet>
          <CourseSidebarList course={course} />
        </SidebarSheet>
      </div>

      <HeaderButtons />
    </header>
  );
}
