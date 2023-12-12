"use client";

import PangeaDrop from "@/components/drag-and-drop";
import { Attachment, Chapter, Course } from "@prisma/client";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CourseChapterForm } from "../form/course-chapter-form";

type CourseChaptersProps = {
  course: Course & { chapters: Chapter[]; attachments: Attachment[] };
};

export default function CourseChapters({ course }: CourseChaptersProps) {
  const router = useRouter();

  //
  const [isEditing, setIsEditing] = useState(false); // For navigation
  const [isUpdating, setIsUpdating] = useState(false); // For spinner

  async function handleUpdatedChapters(
    values: { id: string; position: number }[]
  ) {
    try {
      setIsUpdating(true);
      // Api
      const updatedCourse = await axios.patch(
        `/api/teacher/course/${course.id}/chapter`,
        values
      );
      toast.success("Chapter position updated...");

      // Refresh and redirect
      router.refresh();
      setIsUpdating(false);
    } catch (err) {
      let error;
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = "Something went wrong.";
      }
      toast.error(error);
    }
  }

  return (
    <div className="relative">
      {isUpdating && (
        <div className="bg-slate-400/40 absolute inset-0 place-content-center grid">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div className="space-y-2">
        <div className="flex justify-between">
          <h4 className="">Course chapters</h4>
          <button
            className="flex items-center gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            {!isEditing ? (
              <>
                <Pencil size={16} />
                Add Chapter
              </>
            ) : (
              <>Cancel</>
            )}
          </button>
        </div>

        <div>
          {course.chapters.length > 0 && !isEditing && (
            <PangeaDrop
              chapters={course.chapters}
              updatedChapters={handleUpdatedChapters}
            />
          )}

          {course.chapters.length === 0 && !isEditing && (
            <p className="text-muted-foreground italic">No Chapters</p>
          )}

          {isEditing && (
            <CourseChapterForm course={course} setIsEditing={setIsEditing} />
          )}
        </div>
        {course.chapters.length > 0 && (
          <p className="text-muted-foreground text-xs">
            Drag and drop to reorder chapters
          </p>
        )}
      </div>
    </div>
  );
}
