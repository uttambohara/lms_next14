import { useAuth } from "@clerk/nextjs";

export function isTeacher() {
  const { userId } = useAuth();
  return process.env.NEXT_PUBLIC_ALLOWED_USER === userId;
}
