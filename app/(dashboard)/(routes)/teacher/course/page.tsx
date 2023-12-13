import { prisma } from "@/lib/prisma";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Course() {
  const course = await prisma?.course.findMany();

  if (!course) return null;
  return (
    <div className="container py-3 text-xs sm:text-sm">
      <DataTable columns={columns} data={course} />
    </div>
  );
}
