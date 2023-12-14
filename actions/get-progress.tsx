import { prisma } from "@/lib/prisma";

export default async function getProgress({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) {
  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: courseId,
      },
    },
  });

  if (!purchase) return;
  const chapter = await prisma?.chapter.findMany({
    where: {
      courseId,
    },
    include: {
      chapterProgress: true,
    },
  });

  const totalChapters = chapter.length;
  const completedChapters = chapter.filter(
    (item) => item.chapterProgress?.[0].isCompleted === true
  ).length;

  return (completedChapters / totalChapters) * 100;
}
