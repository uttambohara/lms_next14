import SearchInput from "@/components/search-input";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CategoryCard from "./_components/category-card";
import CategoryList from "./_components/category-list";

export default async function Search({
  searchParams,
}: {
  searchParams: { title: string; categoryId: string };
}) {
  const { userId } = auth();

  if (!userId) redirect("/");

  const category = await prisma?.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const course = await prisma.course.findMany({
    where: {
      categoryId: searchParams.categoryId,
      title: {
        contains: searchParams.title,
      },
      isPublished: true,
    },
    include: {
      category: true,
      chapters: true,
    },
  });

  return (
    <div className="container py-2 space-y-6">
      <div className="lg:hidden">
        <SearchInput />
      </div>

      <CategoryList category={category} />

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
        {course.map((item) => (
          <CategoryCard key={item.id} course={item} />
        ))}
      </div>
    </div>
  );
}
