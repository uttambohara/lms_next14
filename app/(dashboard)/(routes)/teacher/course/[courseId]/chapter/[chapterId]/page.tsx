import { Banner } from "@/components/banner";
import { prisma } from "@/lib/prisma";
import { AlertCircle, EyeIcon, LayoutDashboard, VideoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import HeadingBadge from "../../../_components/heading-badge";
import ChapterButtons from "../_components/chapter-buttons";
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

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const allCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          label={
            "This chapter is unpublished. It will not be visible to the students."
          }
          icon={AlertCircle}
        />
      )}

      <div className="container py-6">
        <div className="mb-6 text-muted-foreground underline underline-offset-2">
          <Link href={`/teacher/course/${params.courseId}`}>
            &larr; Back to course setup
          </Link>
        </div>

        <div className="space-y-6">
          {/* Course heading */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-3xl">Chapter creation</h2>

              <p className="text-muted-foreground">
                Complete all fields {`${completedFields}/ ${totalFields}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ChapterButtons chapter={chapter} allCompleted={allCompleted} />
            </div>
          </div>

          {/* Course Box */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {/* Left Group / flex */}
            <div className="space-y-8">
              <div>
                <HeadingBadge icon={LayoutDashboard}>
                  Customize your chapters
                </HeadingBadge>
                <div className="flex flex-col gap-6">
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
                <div className="flex flex-col gap-6">
                  <div className="course-card">
                    <ChapterPreview chapter={chapter} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-6 md:space-y-10">
                <div>
                  <HeadingBadge icon={VideoIcon}>Add a video</HeadingBadge>
                  <div className="course-card">
                    <ChapterVideo chapter={chapter} />
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
