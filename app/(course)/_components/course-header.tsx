import HeaderButtons from "@/app/(dashboard)/_components/header/header-buttons";
import SidebarSheet from "@/components/sidebar-sheet";
import { Chapter, Course } from "@prisma/client";
import CourseSidebarList from "./course-sidebar-list";

type CourseHeaderProps = {
  course: Course & { chapters: Chapter[] };
};

export default function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <header className="border-b border-gray-200 flex items-center px-4">
      <div className="lg:hidden">
        <SidebarSheet>
          <CourseSidebarList course={course} />
        </SidebarSheet>
      </div>

      <HeaderButtons />
    </header>
  );
}
