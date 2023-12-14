import { Category, Chapter, Course } from "@prisma/client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CategoryCard = {
  course: Course & { category: Category | null; chapters: Chapter[] };
};

export default function CategoryCard({ course }: CategoryCard) {
  return (
    <Link href={`/course/${course.id}`}>
      <div className="p-2 border border-gray-200 rounded-md space-y-3 h-full hover:border hover:border-sky-200 transition">
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
          <h2 className="text-[1rem] truncate">{course.title}</h2>
          <p className="text-muted-foreground">{course.category?.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-sky-100 p-2 rounded-full">
            <BookOpen color="purple" size={18} />
          </div>

          <span>
            {course.chapters.length}{" "}
            {course.chapters.length > 0 ? "chapters" : "chapter"}
          </span>
        </div>
      </div>
    </Link>
  );
}
