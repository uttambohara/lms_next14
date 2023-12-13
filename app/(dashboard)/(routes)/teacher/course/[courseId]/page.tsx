import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import {
  AlertCircle,
  CheckCheckIcon,
  DollarSign,
  Layers2,
  LayoutDashboard,
} from "lucide-react";
import { redirect } from "next/navigation";

import { Banner } from "@/components/banner";
import CourseButtons from "../_components/course-buttons";
import CourseAttachments from "../_components/course/course-attachments";
import CourseCategory from "../_components/course/course-category";
import CourseChapters from "../_components/course/course-chapters";
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
      chapters: {
        orderBy: [
          {
            position: "asc",
          },
          {
            title: "asc",
          },
        ],
      },
      attachments: true,
    },
  });

  if (!course) redirect("/");

  const category = await prisma?.category.findMany();

  const allFields = [
    course?.title,
    course?.description,
    course?.price,
    course?.categoryId,
    course?.chapters[0],
  ];

  const totalFields = allFields.length;
  const completedFields = allFields.filter(Boolean).length;
  const allCompleted = allFields.every(Boolean);

  // Check if any chapter is published
  const checkChapterPublished = await prisma.chapter.findMany({
    where: {
      courseId: params.courseId,
      isPublished: true,
    },
  });

  if (checkChapterPublished.length === 0) {
    await prisma.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });
  }

  return (
    <>
      {!course.isPublished && (
        <Banner
          label={`This course is unpublished. It will not be visible to the students. ${
            allCompleted && checkChapterPublished.length === 0
              ? "Make sure at least one of the course is published."
              : ""
          } `}
          icon={AlertCircle}
        />
      )}

      <div className="container py-6">
        <div className="space-y-6">
          {/* Course heading */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl mb-1">Course setup</h2>
              <p className="text-muted-foreground">
                Complete all fields {`${completedFields}/ ${totalFields}`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <CourseButtons
                course={course}
                allCompleted={allCompleted}
                checkChapterPublished={checkChapterPublished.length === 0}
              />
            </div>
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
              <div className="md:space-y-10 space-y-6">
                <div>
                  <HeadingBadge icon={CheckCheckIcon}>
                    Course chapters
                  </HeadingBadge>
                  <div className="course-card gradient">
                    <CourseChapters course={course} />
                  </div>
                </div>

                <div>
                  <HeadingBadge icon={DollarSign}>
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
    </>
  );
}
