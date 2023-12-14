import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import CourseHeader from "../../../_components/course-header";
import CourseSidebar from "../../../_components/course-sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  //
  const course = await prisma?.course.findFirst({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          chapterProgress: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) redirect("/");

  return (
    <div className="grid grid-rows-[70px_1fr] lg:grid-cols-[300px_1fr] h-screen">
      <CourseSidebar course={course} />

      <CourseHeader course={course} />

      <main className="overflow-y-scroll ">{children}</main>
    </div>
  );
}
