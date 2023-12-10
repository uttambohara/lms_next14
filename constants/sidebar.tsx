import { BarChart2, BookA, LayoutDashboard, LibraryBig } from "lucide-react";

export const guestRoute = [
  {
    path: "/",
    element: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/browse",
    element: "Search",
    icon: LibraryBig,
  },
];

export const teacherRoute = [
  {
    path: "/teacher/create",
    element: "Courses",
    icon: BookA,
  },
  {
    path: "/teacher/analytics",
    element: "Analytics",
    icon: BarChart2,
  },
];
