import { auth } from "@clerk/nextjs";

export function isTeacher() {
  const { userId } = auth();
  return process.env.NEXT_PUBLIC_ALLOWED_USER === userId;
}
