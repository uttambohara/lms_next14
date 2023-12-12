"use client";

import { Chapter } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { ChapterCheckBoxform } from "../form/chapter-checkbox-form";

type ChapterPreviewProps = {
  chapter: Chapter;
};

export default function ChapterPreview({ chapter }: ChapterPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="">Free chapter preview</h4>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? (
            <>
              <Pencil size={16} />
              Access Setting
            </>
          ) : (
            <>Cancel</>
          )}
        </button>
      </div>

      <div>
        {!isEditing && chapter.isFree && (
          <p className="text-muted-foreground">
            This chapter is <strong>free</strong>.
          </p>
        )}

        {!isEditing && !chapter.isFree && (
          <p className="text-muted-foreground">
            This chapter is <strong>not free</strong>.
          </p>
        )}

        {isEditing && (
          <ChapterCheckBoxform chapter={chapter} setIsEditing={setIsEditing} />
        )}
      </div>
    </div>
  );
}
