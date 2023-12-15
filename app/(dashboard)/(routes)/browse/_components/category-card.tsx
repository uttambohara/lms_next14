import getProgress from "@/actions/get-progress";
import CourseProgress from "@/components/ui/course-progress";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Category, Chapter, Course } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type CategoryCardProps = {
  course: Course & { category: Category | null; chapters: Chapter[] };
};

export default async function CategoryCard({ course }: CategoryCardProps) {
  const { userId } = auth();

  if (!userId) redirect("/");
  const courseProgress = await getProgress({ courseId: course.id, userId });

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <Link href={`/course/${course.id}`}>
      <div className="group h-full space-y-3 rounded-md border border-gray-200 p-2 transition hover:border hover:border-sky-200 hover:bg-slate-100">
        <div className="relative aspect-video">
          <Image
            src={`${course.imageUrl}`}
            alt={course.title}
            fill
            priority
            className="rounded-md"
          />
        </div>

        <div>
          <h2 className="truncate text-[1rem] font-bold group-hover:text-sky-700">
            {course.title}
          </h2>
          <p className="text-muted-foreground">{course.category?.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-sky-100 p-2">
            <BookOpen color="purple" size={18} />
          </div>

          <span>
            {course.chapters.length}{" "}
            {course.chapters.length > 0 ? "chapters" : "chapter"}
          </span>
        </div>

        <div className="font-bold group-hover:text-sky-700">
          {purchase?.id ? (
            <CourseProgress
              value={courseProgress!}
              variant={courseProgress === 100 ? "success" : "default"}
            />
          ) : (
            <div className="text-[1rem]">{`$${course.price}`}</div>
          )}
        </div>
      </div>
    </Link>
  );
}
