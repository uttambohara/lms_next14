"use client";

import Alert from "@/components/alert";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/confetti-store";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ButtonsProps = {
  chapter: Chapter;
  allCompleted: boolean;
};

export default function ChapterButtons({
  chapter,
  allCompleted,
}: ButtonsProps) {
  const router = useRouter();
  const store = useConfettiStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);

  async function handlePublish() {
    try {
      setIsUpdating(true);
      // api

      if (chapter.isPublished) {
        await axios.patch(
          `/api/teacher/course/${chapter.courseId}/chapter/${chapter.id}/unpublish`
        );

        toast.success("Chapter unpublished...");
      } else {
        await axios.patch(
          `/api/teacher/course/${chapter.courseId}/chapter/${chapter.id}/publish`
        );
        toast.success("Chapter published...");

        store.onOpen();
      }

      // refresh and redirect
      router.refresh();
    } catch (err) {
      let error;
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = "Something went wrong.";
      }
      toast.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleClick() {
    try {
      setisDeleting(true);
      // api
      await axios.delete(
        `/api/teacher/course/${chapter.courseId}/chapter/${chapter.id}`
      );
      // refresh and redirect
      router.refresh();

      router.push(`/teacher/course/${chapter.courseId}`);

      window.location.assign(`/teacher/course/${chapter.courseId}`);
    } catch (err) {
      let error;
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = "Something went wrong.";
      }
      toast.error(error);
    } finally {
      setisDeleting(false);
    }
  }

  return (
    <>
      <Button
        variant={"outline"}
        size="sm"
        disabled={!allCompleted || isUpdating}
        onClick={handlePublish}
      >
        {chapter.isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Alert name={"chapter"} handleClick={handleClick}>
        <Button size="sm" disabled={isDeleting}>
          {isDeleting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </Button>
      </Alert>
    </>
  );
}
