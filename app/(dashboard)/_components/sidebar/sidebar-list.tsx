"use client";

import { guestRoute, teacherRoute } from "@/constants/sidebar";
import { usePathname } from "next/navigation";
import SidebarListItem from "./sidebar-list-item";

export default function SidebarList() {
  const pathname = usePathname();

  // Teacher mode
  const isTeacherMode = pathname.includes("teacher");
  const route = isTeacherMode ? teacherRoute : guestRoute;

  return (
    <ul className="text-gray-500">
      {route.map((sidebarItem) => (
        <SidebarListItem
          key={sidebarItem.element}
          icon={sidebarItem.icon}
          element={sidebarItem.element}
          path={sidebarItem.path}
        />
      ))}
    </ul>
  );
}
