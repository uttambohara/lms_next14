import { Progress, ProgressBackground } from "./progress";

type CourseProgressProps = {
  value: number;
} & ProgressBackground;

export default function CourseProgress({
  value,
  variant,
}: CourseProgressProps) {
  return (
    <div>
      <Progress value={value} className="mb-1" variant={variant} />
      <p
        className={`font-bold ${
          variant === "success" ? "text-emerald-800" : "text-sky-800"
        }`}
      >
        {value}% complete
      </p>
    </div>
  );
}
