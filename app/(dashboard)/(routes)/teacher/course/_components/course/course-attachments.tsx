"use client";

import { Attachment, Chapter, Course } from "@prisma/client";
import axios from "axios";
import { Loader2, Paperclip, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CourseAttachmentsForm } from "../form/course-attachments-form";

type CourseAttachmentsProps = {
  course: Course & { chapters: Chapter[]; attachments: Attachment[] };
};

export default function CourseAttachments({ course }: CourseAttachmentsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState("");

  const router = useRouter();

  async function onDelete(id: string) {
    try {
      setIsDeleting(id);
      // api
      await axios.delete(`/api/teacher/course/${course.id}/attachments/${id}`);
      toast.success("Course attachment deleted...");
      // refresh and redirect
      router.refresh();
      setIsEditing(false);
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
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="">Course attachments</h4>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? (
            <>
              <PlusCircle size={16} />
              Add attachments
            </>
          ) : (
            <>Cancel</>
          )}
        </button>
      </div>

      <div>
        {course.attachments.length > 0 && !isEditing && (
          <ul className="space-y-2">
            {course.attachments.map((attachment) => (
              <li
                key={attachment.id}
                className="flex cursor-pointer items-center justify-between rounded-md bg-slate-200 p-2 text-xs"
                onClick={() => onDelete(attachment.id)}
              >
                <span className="flex items-center gap-1">
                  <Paperclip />
                  {attachment.name}
                </span>

                {isDeleting === attachment.id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <X />
                )}
              </li>
            ))}
          </ul>
        )}

        {course.attachments.length === 0 && !isEditing && (
          <p className="italic text-muted-foreground">No attachments</p>
        )}

        {isEditing && (
          <CourseAttachmentsForm course={course} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
