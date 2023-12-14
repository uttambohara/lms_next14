"use client";

import { QuillReader } from "@/components/ui/react-quill-read";
import { Chapter } from "@prisma/client";

export default function ChapterDescriptionQuill({
  chapter,
}: {
  chapter: Chapter;
}) {
  return (
    <div>
      <QuillReader value={chapter.description!} />
    </div>
  );
}
