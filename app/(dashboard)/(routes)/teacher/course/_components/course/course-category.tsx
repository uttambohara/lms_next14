"use client";

import { Attachment, Category, Chapter, Course } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { CourseCategoryForm } from "../form/course-category-form";

type CourseCategoryProps = {
  course: Course & {
    chapters: Chapter[];
    attachments: Attachment[];
  };
  category: Category[];
};

export default function CourseCategory({
  course,
  category,
}: CourseCategoryProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="">Course category</h4>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? (
            <>
              <Pencil size={16} />
              Edit category
            </>
          ) : (
            <>Cancel</>
          )}
        </button>
      </div>

      <div>
        {course.categoryId && !isEditing && (
          <p className="leading-6 text-muted-foreground">
            {category.find((item) => item.id === course.categoryId)?.name}
          </p>
        )}

        {!course.categoryId && !isEditing && (
          <p className="italic text-muted-foreground">No Category</p>
        )}

        {isEditing && (
          <CourseCategoryForm
            course={course}
            category={category}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </div>
  );
}
