import ChapterAttachmentItem from "@/app/(course)/_components/chapter-attachment-item";
import ChapterDescriptionQuill from "@/app/(course)/_components/chapter-description-quill";
import CompleteUncompleteButtons from "@/app/(course)/_components/complete-uncomplete-buttons";
import VideoPlayer from "@/app/(course)/_components/video-player";

import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Chapter({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();

  if (!userId) redirect("/");

  const chapter = await prisma.chapter.findFirst({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
      isPublished: true,
    },
    include: {
      videoUrl: true,
      chapterProgress: true,
    },
  });

  const course = await prisma.course.findFirst({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      chapters: true,
      attachments: true,
    },
  });

  if (!chapter) redirect("/");

  // Next chapter
  const allChapters = await prisma.chapter.findMany({
    where: {
      courseId: params.courseId,
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      chapterProgress: true,
    },
    orderBy: {
      position: "asc",
    },
  });

  const allCompleted = allChapters.every(
    (item) => item.chapterProgress?.[0].isCompleted === true
  );

  // Index of Next Chapter = Current Index + 1
  const indexOfNextChapter =
    allChapters.findIndex((item) => item.id === chapter.id) + 1;

  const nextChapter = allChapters[indexOfNextChapter];

  // Is the course purchased?
  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: params.courseId,
      },
    },
  });

  const isLocked = !chapter?.isFree && !purchase;

  // User progress of User on Chapter?
  const hasUserProgress = await prisma.chapterProgress.findFirst({
    where: {
      userId,
      chapterId: params.chapterId,
    },
  });

  // If not, create a default user progress
  if (!Boolean(hasUserProgress)) {
    await prisma.chapterProgress.create({
      data: {
        userId,
        chapterId: params.chapterId,
      },
    });
  }

  return (
    <>
      {isLocked && (
        <Banner
          label={"You need to purchase this chapter in order to view it."}
          icon={AlertCircle}
        />
      )}

      <div className="max-w-[55rem] py-4 space-y-6 mx-auto px-4">
        <VideoPlayer
          courseId={params.courseId}
          chapter={chapter!}
          isLocked={isLocked}
          nextChapter={nextChapter}
          allCompleted={allCompleted}
        />

        <div>
          <div className="flex items-center justify-between py-3">
            <h2 className="text-2xl font-bold mb-3">{chapter.title}</h2>

            <CompleteUncompleteButtons
              courseId={params.courseId}
              purchase={purchase}
              chapter={chapter}
              nextChapter={nextChapter}
              allCompleted={allCompleted}
            />
          </div>

          <Separator />

          <div className="py-3">
            <h3 className="text-xl mb-2">Description</h3>
            <ChapterDescriptionQuill chapter={chapter} />
          </div>

          {!isLocked && purchase?.id && (
            <>
              <Separator />

              <div className="py-3">
                <h3 className="text-xl mb-2">Attachments</h3>

                <ul className="flex gap-3 flex-col">
                  {course?.attachments.length === 0 && (
                    <div>No attachments</div>
                  )}

                  {course?.attachments.map((attachment) => (
                    <ChapterAttachmentItem
                      key={attachment.id}
                      attachment={attachment}
                    />
                  ))}
                </ul>
              </div>

              <Separator />
            </>
          )}
        </div>
      </div>
    </>
  );
}
