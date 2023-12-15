"use client";

import { QuillReader } from "@/components/ui/react-quill-read";
import { Chapter } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { ChapterDescriptionForm } from "../form/chapter-description-form";

type ChapterDescriptionProps = {
  chapter: Chapter;
};

export default function ChapterDescription({
  chapter,
}: ChapterDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h4 className="">Chapter Description</h4>
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
        {!chapter.description && !isEditing && (
          <p className="italic text-muted-foreground">No chapter description</p>
        )}

        {chapter.description && !isEditing && (
          <p className="text-muted-foreground">
            <QuillReader value={chapter.description} />
          </p>
        )}

        {isEditing && (
          <ChapterDescriptionForm
            chapter={chapter}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
    </div>
  );
}
