"use client";

import { Attachment, Chapter, Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { CoursePriceForm } from "../form/course-price-form";

type CoursePriceProps = {
  course: Course & { chapters: Chapter[]; attachments: Attachment[] };
};

export default function CoursePrice({ course }: CoursePriceProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="text-[1rem]">Course price</h4>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? (
            <>
              <Pencil size={16} />
              Edit Price
            </>
          ) : (
            <>Cancel</>
          )}
        </button>
      </div>

      <div>
        {course.price && !isEditing && (
          <p className="text-muted-foreground leading-6">${course.price}</p>
        )}

        {!course.price && !isEditing && (
          <p className="text-muted-foreground">
            Please specify the price of the course ...
          </p>
        )}

        {isEditing && (
          <CoursePriceForm course={course} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
