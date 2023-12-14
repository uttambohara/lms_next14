import { Attachment } from "@prisma/client";
import { File } from "lucide-react";

type ChapterAttachmentItem = {
  attachment: Attachment;
};

export default function ChapterAttachmentItem({
  attachment,
}: ChapterAttachmentItem) {
  return (
    <a
      href={attachment.url}
      target="_blank"
      className="hover:underline hover:underline-offset-2"
    >
      <li className="flex items-center gap-2 p-3 bg-sky-100 rounded-md text-xs">
        <span>
          <File color="#7ca1ba" />
        </span>
        <span>{attachment.name}</span>
      </li>
    </a>
  );
}
