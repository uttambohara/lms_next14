import { prisma } from "@/lib/prisma";
import { EyeIcon, LayoutDashboard, VideoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import HeadingBadge from "../../../_components/heading-badge";
import ChapterDescription from "../_components/chapter/chapter-description";
import ChapterPreview from "../_components/chapter/chapter-preview";
import ChapterTitle from "../_components/chapter/chapter-title";
import ChapterVideo from "../_components/chapter/chapter-video";

export default async function Chapter({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const chapter = await prisma?.chapter.findFirst({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      videoUrl: true,
    },
  });

  if (!chapter) redirect("/");

  console.log({ chapter });

  return (
    <div className="container py-6">
      <div className="mb-3">
        <Link href={`/teacher/course/${params.courseId}`}>
          &larr; Back to course
        </Link>
      </div>

      <div className="space-y-6">
        {/* Course heading */}
        <div>
          <h2 className="text-3xl mb-1">Chapter creation</h2>
          <p className="text-muted-foreground "></p>
        </div>

        {/* Course Box */}
        <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
          {/* Left Group / flex*/}
          <div className="space-y-8">
            <div>
              <HeadingBadge icon={LayoutDashboard}>
                Customize your chapters
              </HeadingBadge>
              <div className="flex gap-6 flex-col">
                <div className="course-card">
                  <ChapterTitle chapter={chapter} />
                </div>
                <div className="course-card">
                  <ChapterDescription chapter={chapter} />
                </div>
              </div>
            </div>
            <div>
              <HeadingBadge icon={EyeIcon}>Chapter access</HeadingBadge>
              <div className="flex gap-6 flex-col">
                <div className="course-card">
                  <ChapterPreview chapter={chapter} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="md:space-y-10 space-y-6">
              <div>
                <HeadingBadge icon={VideoIcon}>Add a video</HeadingBadge>
                <div className="course-card gradient">
                  <ChapterVideo chapter={chapter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
