import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";

type InfoCardProps = {
  variant: "lightSuccess" | "progress";
  label: string;
  courseNumber: number;
};

export default function InfoCard({
  variant,
  label,
  courseNumber,
}: InfoCardProps) {
  const Icon = variant === "lightSuccess" ? Clock : CheckCircle;

  return (
    <div className="flex items-center gap-4 rounded-md border border-gray-200 p-3">
      <Badge variant={variant} className="h-[3.2rem]">
        <Icon
          color={variant === "lightSuccess" ? "green" : "purple"}
          size={30}
        />
      </Badge>

      <div>
        <h3 className="font-bold">{label}</h3>
        <div className="text-muted-foreground">
          {courseNumber} {courseNumber > 1 ? "courses" : "course"}
        </div>
      </div>
    </div>
  );
}
