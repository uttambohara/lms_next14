import { UploadDropzone } from "@/lib/uploadthing";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { UploadFileResponse } from "uploadthing/client";

type ChapterVideoProps = {
  chapter: Chapter;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

// Create form
export function ChapterVideoForm({ chapter, setIsEditing }: ChapterVideoProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  // handler
  async function onSubmit(res: UploadFileResponse[] | undefined) {
    const values = { videoUrl: res?.[0].fileUrl };

    try {
      setIsUpdating(false);
      // api
      await axios.patch(
        `/api/teacher/course/${chapter.courseId}/chapter/${chapter.id}`,
        values
      );
      toast.success("Course video updated...");

      // refresh and redirect
      router.refresh();
      setIsEditing(false);
    } catch (err) {
      let error;
      if (err instanceof Error) {
        error = err.message;
      } else {
        error = "Something went wrong.";
      }
      toast.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <UploadDropzone
      endpoint="videoUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response

        onSubmit(res);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
