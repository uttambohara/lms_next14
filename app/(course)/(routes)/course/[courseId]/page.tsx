import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Course({
  params,
}: {
  params: { courseId: string };
}) {
  const chapters = await prisma.chapter.findMany({
    where: {
      courseId: params.courseId,
    },
    orderBy: {
      position: "asc",
    },
  });

  return redirect(`/course/${params.courseId}/chapter/${chapters[0].id}`);
}
