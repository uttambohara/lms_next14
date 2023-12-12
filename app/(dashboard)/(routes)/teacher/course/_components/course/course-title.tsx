"use client";

import { Attachment, Chapter, Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { CourseTitleForm } from "../form/course-title-form";

type CourseTitleProps = {
  course: Course & { chapters: Chapter[]; attachments: Attachment[] };
};

export default function CourseTitle({ course }: CourseTitleProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="md:text-xl text-[1rem]">Course title</h4>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? (
            <>
              <Pencil size={16} />
              Edit Title
            </>
          ) : (
            <>Cancel</>
          )}
        </button>
      </div>

      <div>
        {course.title && !isEditing && (
          <p className="text-muted-foreground">{course.title}</p>
        )}

        {isEditing && (
          <CourseTitleForm course={course} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
