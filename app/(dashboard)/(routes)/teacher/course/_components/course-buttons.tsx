"use client";

import Alert from "@/components/alert";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/confetti-store";
import { Course } from "@prisma/client";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ButtonsProps = {
  course: Course;
  allCompleted: boolean;
  checkChapterPublished: boolean;
};

export default function CourseButtons({
  course,
  allCompleted,
  checkChapterPublished,
}: ButtonsProps) {
  const router = useRouter();
  const store = useConfettiStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);

  async function handlePublish() {
    try {
      setIsUpdating(true);
      // api

      if (course.isPublished) {
        await axios.patch(`/api/teacher/course/${course.id}/unpublish`);

        toast.success("Course unpublished...");
      } else {
        await axios.patch(`/api/teacher/course/${course.id}/publish`);
        toast.success("Course published...");
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
      await axios.delete(`/api/teacher/course/${course.id}`);

      toast.success("Course deleted...");
      // refresh and redirect
      router.refresh();

      router.push(`/teacher/create`);
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
        disabled={!allCompleted || isUpdating || checkChapterPublished}
        onClick={handlePublish}
      >
        {course.isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Alert name={"course"} handleClick={handleClick}>
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
