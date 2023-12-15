"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "./ui/card";

type BarChartProps = {
  data: {
    name: string;
    total: number;
  }[];
};

export default function BarChart({ data }: BarChartProps) {
  console.log(data);
  return (
    <Card className="pt-12">
      <ResponsiveContainer width="100%" height={450}>
        <RechartsBarChart data={data}>
          <XAxis
            dataKey="name"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(format) => `$${format}`}
          />

          <Bar dataKey="total" fill="#0369a1" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </Card>
  );
}
