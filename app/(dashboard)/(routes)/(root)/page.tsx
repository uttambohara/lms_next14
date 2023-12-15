import getDashboardCourse from "@/actions/get-dashboard-course";
import InfoCard from "../../_components/info-card";
import CategoryCard from "../browse/_components/category-card";

export default async function Home() {
  const { completedCourse, uncompletedCourse } = await getDashboardCourse();

  return (
    <div className="container mt-6 space-y-4 py-2 lg:space-y-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-6">
        <InfoCard
          variant="progress"
          label="In progress"
          courseNumber={uncompletedCourse.length}
        />
        <InfoCard
          variant="lightSuccess"
          label="Completed"
          courseNumber={completedCourse.length}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {uncompletedCourse.map((item) => (
          <CategoryCard key={item.id} course={item} />
        ))}

        {completedCourse.map((item) => (
          <CategoryCard key={item.id} course={item} />
        ))}
      </div>
    </div>
  );
}
