import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { BadgeDollarSign, Layers2, LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";

import CourseAttachments from "../_components/course/course-attachments";
import CourseCategory from "../_components/course/course-category";
import CourseDescription from "../_components/course/course-description";
import CourseImage from "../_components/course/course-image";
import CoursePrice from "../_components/course/course-price";
import CourseTitle from "../_components/course/course-title";
import HeadingBadge from "../_components/heading-badge";

export default async function Course({
  params,
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();

  //
  if (!userId) redirect("/");

  // course
  const course = await prisma?.course.findFirst({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: true,
      attachments: true,
    },
  });

  const category = await prisma?.category.findMany();

  if (!course) redirect("/");

  const allFields = [
    course?.title,
    course?.description,
    course?.price,
    course?.categoryId,
    course?.chapters[0],
    course?.attachments[0],
  ];

  const totalFields = allFields.length;
  const completedFields = allFields.filter(Boolean).length;

  console.log({ course });
  return (
    <div className="container py-6">
      <div className="space-y-6">
        {/* Course heading */}
        <div>
          <h2 className="text-3xl mb-1">Course setup</h2>
          <p className="text-muted-foreground text-xl">
            Complete all fields {`${completedFields}/ ${totalFields}`}
          </p>
        </div>

        {/* Course Box */}
        <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
          {/* Left Group / flex*/}
          <div>
            <HeadingBadge icon={LayoutDashboard}>
              Customize your course
            </HeadingBadge>

            <div className="flex gap-6 flex-col">
              <div className="course-card">
                <CourseTitle course={course} />
              </div>

              <div className="course-card">
                <CourseDescription course={course} />
              </div>

              <div className="course-card">
                <CourseImage course={course} />
              </div>

              <div className="course-card">
                <CourseCategory course={course} category={category} />
              </div>
            </div>
          </div>

          {/* Right Group / normal*/}
          <div>
            <div className="space-y-10">
              <div>
                <HeadingBadge icon={BadgeDollarSign}>
                  Sell your course
                </HeadingBadge>
                <div className="course-card">
                  <CoursePrice course={course} />
                </div>
              </div>

              <div>
                <HeadingBadge icon={Layers2}>
                  Resources & Attachments
                </HeadingBadge>
                <div className="course-card">
                  <CourseAttachments course={course} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
