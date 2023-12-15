export function isTeacher(userId: string) {
  return process.env.NEXT_PUBLIC_ALLOWED_USER === userId;
}
