"use client";

import { Attachment, Chapter, Course } from "@prisma/client";
import { ImageDown, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CourseImageForm } from "../form/course-image-form";

type CourseImageProps = {
  course: Course & { chapters: Chapter[]; attachments: Attachment[] };
};

export default function CourseImage({ course }: CourseImageProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h4 className="">Course image</h4>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? (
            <>
              <PlusCircle size={18} />
              Add Image
            </>
          ) : (
            <>Cancel</>
          )}
        </button>
      </div>

      <div>
        {course.imageUrl && !isEditing && (
          <div className="relative aspect-video w-full h-[15rem]">
            <Image
              src={course.imageUrl}
              priority
              fill
              alt={course.title}
              className="object-cover"
            />
          </div>
        )}

        {!course.imageUrl && !isEditing && (
          <div
            className="h-60 w-full aspect-video bg-gray-200 relative cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <ImageDown
              color="gray"
              size={40}
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            />
          </div>
        )}

        {isEditing && (
          <CourseImageForm course={course} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
