"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/confetti-store";
import { Chapter, ChapterProgress, Purchase } from "@prisma/client";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CompleteUncompleteButtons = {
  purchase: Purchase | null;
  chapter: Chapter & { chapterProgress: ChapterProgress[] };
  nextChapter: { id: string; title: string } | undefined;
  courseId: string;
  allCompleted: boolean;
};

export default function CompleteUncompleteButtons({
  courseId,
  purchase,
  chapter,
  nextChapter,
  allCompleted,
}: CompleteUncompleteButtons) {
  const store = useConfettiStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (allCompleted) store.onOpen();
  }, [allCompleted]);
  //
  async function handleClick(message: string) {
    try {
      setIsUpdating(true);
      await axios.patch(
        `/api/courses/${chapter.courseId}/chapter/${chapter.id}/${
          message === "complete" ? "complete" : "uncomplete"
        }`,
        { id: chapter.chapterProgress?.[0].id }
      );

      toast.success("Updating progress...");

      if (message === "complete" && Boolean(nextChapter?.id)) {
        router.push(`/course/${courseId}/chapter/${nextChapter?.id}`);
      }

      router.refresh();
    } catch (err) {
      let error;

      if (err instanceof Error) {
        error = err.message;
      } else {
        error = "Something went wrong";
      }

      toast.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div>
      {!purchase ? (
        <Button variant={"success"}>Enroll now</Button>
      ) : !chapter.chapterProgress?.[0].isCompleted ? (
        <Button
          disabled={isUpdating}
          variant={"success"}
          className="flex items-center gap-2"
          onClick={() => handleClick("complete")}
        >
          <span>Mark as complete</span>
          <span>
            <CheckCircle size={16} />
          </span>
        </Button>
      ) : (
        <Button
          disabled={isUpdating}
          variant={"secondary"}
          className="flex items-center gap-2"
          onClick={() => handleClick("uncomplete")}
        >
          <span>Mark as uncomplete</span>
          <span>
            <XCircle size={16} />
          </span>
        </Button>
      )}
    </div>
  );
}