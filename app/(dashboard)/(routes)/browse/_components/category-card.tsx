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
      <div className="group h-full space-y-3 rounded-md border border-gray-200 p-2 transition hover:border hover:border-sky-200 hover:bg-slate-50">
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Image
            src={`${course.imageUrl}`}
            alt={course.title}
            fill
            priority
            className="rounded-md transition-all group-hover:scale-110"
          />
        </div>

        <div>
          <h2 className="truncate font-sans text-[1rem] font-bold group-hover:text-sky-700">
            {course.title}
          </h2>
          <p className="text-[0.8rem] text-muted-foreground">
            {course.category?.name}
          </p>
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

        <div className="font-sans group-hover:text-sky-700">
          {purchase?.id ? (
            <CourseProgress
              value={courseProgress!}
              variant={courseProgress === 100 ? "success" : "default"}
            />
          ) : (
            <div className="text-[0.9rem] font-bold">{`$${course.price}`}</div>
          )}
        </div>
      </div>
    </Link>
  );
}
