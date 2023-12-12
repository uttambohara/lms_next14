import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Settings2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import CourseDescription from "../_components/course/course-description";
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
    <div className="container pt-6">
      <div className="space-y-10">
        {/* Course heading */}
        <div>
          <h2 className="text-3xl">Course setup</h2>
          <p className="text-muted-foreground">
            Complete all fields {`${completedFields}/ ${totalFields}`}
          </p>
        </div>

        {/* Course Box */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Left Group / flex*/}
          <div>
            <HeadingBadge icon={Settings2Icon}>
              Customize your course
            </HeadingBadge>

            <div className="flex gap-8 flex-col">
              <div className="course-card">
                <CourseTitle course={course} />
              </div>

              <div className="course-card">
                <CourseDescription course={course} />
              </div>
            </div>
          </div>

          {/* Right Group / normal*/}
          <div className="space-y-8"></div>
        </div>
      </div>
    </div>
  );
}
