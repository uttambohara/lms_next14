import { isTeacher } from "@/lib/is-teacher";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const authCheck = () => {
  const { userId } = auth();
  if (!userId || !isTeacher(userId)) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(authCheck)
    .onUploadComplete(() => {}),
  attachmentsUploader: f(["image", "video", "pdf", "audio"])
    .middleware(authCheck)
    .onUploadComplete(() => {}),
  videoUploader: f(["video"])
    .middleware(authCheck)
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
