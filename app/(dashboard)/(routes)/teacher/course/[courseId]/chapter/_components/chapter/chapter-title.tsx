"use client";

import { Chapter } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { ChapterTitleForm } from "../form/chapter-title-form";

type ChapterTitleProps = {
  chapter: Chapter;
};

export default function ChapterTitle({ chapter }: ChapterTitleProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="">Chapter title</h4>
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
        {chapter.title && !isEditing && (
          <p className="text-muted-foreground">{chapter.title}</p>
        )}

        {isEditing && (
          <ChapterTitleForm chapter={chapter} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
