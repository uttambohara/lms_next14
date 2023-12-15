"use client";

import { cn } from "@/lib/utils";
import { Chapter, ChapterProgress, Purchase } from "@prisma/client";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type ChapterItemProps = {
  chapter: Chapter & { chapterProgress: ChapterProgress[] };
  courseId: string;
  isPurchased: Purchase | null;
};

export default function ChapterItem({
  chapter,
  courseId,
  isPurchased,
}: ChapterItemProps) {
  const params = useParams();

  const isActive = params.chapterId === chapter.id;

  //
  const isLocked = !chapter.isFree && !isPurchased;

  const completed = chapter.chapterProgress?.[0]?.isCompleted;

  return (
    <Link href={`/course/${courseId}/chapter/${chapter.id}`}>
      <li
        className={cn(
          "mb-1.5 flex h-[3rem] items-center gap-2 rounded-md px-4 text-[0.9rem]",
          !isActive && "transition hover:bg-slate-100",
          isActive && "bg-slate-50",
        )}
      >
        <span>
          {isLocked ? (
            <Lock className={cn(isActive && "text-sky-700")} size={22} />
          ) : completed ? (
            <CheckCircle
              className={cn(
                isActive && "text-sky-700",
                completed && "text-emerald-700",
              )}
              size={22}
            />
          ) : (
            <PlayCircle
              className={cn(
                isActive && "text-sky-700",
                completed && "text-emerald-700",
              )}
              size={22}
            />
          )}
        </span>
        <span
          className={cn(
            isActive && "text-sky-700",
            completed && "text-emerald-700",
          )}
        >
          {chapter.title}
        </span>
      </li>
    </Link>
  );
}
