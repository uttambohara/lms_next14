import { UploadDropzone } from "@/lib/uploadthing";
import { Attachment, Chapter, Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { UploadFileResponse } from "uploadthing/client";

type CourseImageFormProps = {
  course: Course & { chapters: Chapter[]; attachments: Attachment[] };
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

// Create form
export function CourseImageForm({
  course,
  setIsEditing,
}: CourseImageFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  // handler
  async function onSubmit(res: UploadFileResponse[] | undefined) {
    const values = { imageUrl: res?.[0].fileUrl };

    try {
      setIsUpdating(false);
      // api
      const updatedCourse = await axios.patch(
        `/api/teacher/course/${course.id}`,
        values
      );
      toast.success("Course image updated...");

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
      endpoint="imageUploader"
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
