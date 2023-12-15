import getAnalytics from "@/actions/get-analytics";
import BarChart from "@/components/bar-chart";
import { Card } from "@/components/ui/card";

export default async function Analytics() {
  const { formattedCourseAndTotal, totalSales, totalRevenue } =
    (await getAnalytics()) || {};

  return (
    <div className="container space-y-6 py-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card className="space-y-2 p-4">
          <h2>Total Sales</h2>
          <div className="font-sans text-2xl font-bold">{totalSales}</div>
        </Card>
        <Card className="space-y-2 p-4">
          <h2>Total Revenue</h2>
          <div className="font-sans text-2xl font-bold">${totalRevenue}</div>
        </Card>
      </div>
      <div>
        <BarChart data={formattedCourseAndTotal!} />
      </div>
    </div>
  );
}
