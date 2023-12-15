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
        <h4 className="">Course price</h4>
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
          <p className="leading-6 text-muted-foreground">
            ${course.price !== 0 ? course.price : "No price"}
          </p>
        )}

        {!course.price && !isEditing && (
          <p className="italic text-muted-foreground">No price</p>
        )}

        {isEditing && (
          <CoursePriceForm course={course} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
