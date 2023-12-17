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
    orderBy: {
      title: "asc",
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  return (
    <div className="container space-y-4 py-2 lg:space-y-8">
      <div className="lg:hidden">
        <SearchInput />
      </div>

      <CategoryList category={category} />

      {course.length === 0 ? (
        <div className="grid h-[30rem] place-content-center text-[1rem] text-muted-foreground">
          No courses has been added by the instructor... Please wait until the
          instructor adds one.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {course.map((item) => (
            <CategoryCard key={item.id} course={item} />
          ))}
        </div>
      )}
    </div>
  );
}
