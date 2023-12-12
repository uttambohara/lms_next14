"use client";

import { Attachment, Chapter, Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { CourseDescriptionForm } from "../form/course-description-form";

type CourseDescriptionProps = {
  course: Course & { chapters: Chapter[]; attachments: Attachment[] };
};

export default function CourseDescription({ course }: CourseDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="md:text-xl text-[1rem]">Course description</h4>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? (
            <>
              <Pencil size={16} />
              Edit Description
            </>
          ) : (
            <>Cancel</>
          )}
        </button>
      </div>

      <div>
        {course.description && !isEditing && (
          <p className="text-muted-foreground leading-6">
            {course.description}
          </p>
        )}

        {!course.description && !isEditing && (
          <p className="text-muted-foreground">No course description</p>
        )}

        {isEditing && (
          <CourseDescriptionForm course={course} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
