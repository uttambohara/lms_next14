import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container space-y-8 pt-8">
      <div className="flex items-center gap-4">
        {Array.from({ length: 7 }, () => "item").map((item) => (
          <Skeleton
            className="h-8 w-[6rem] rounded-full px-2 py-1"
            key={item}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        <div className="space-y-3">
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[1rem] w-full rounded-full" />
          <Skeleton className="h-[1rem] w-[80%] rounded-full" />
          <Skeleton className="h-[1rem] w-[60%] rounded-full" />
          <Skeleton className="h-[1rem] w-[30%] rounded-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[1rem] w-full rounded-full" />
          <Skeleton className="h-[1rem] w-[80%] rounded-full" />
          <Skeleton className="h-[1rem] w-[60%] rounded-full" />
          <Skeleton className="h-[1rem] w-[30%] rounded-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[1rem] w-full rounded-full" />
          <Skeleton className="h-[1rem] w-[80%] rounded-full" />
          <Skeleton className="h-[1rem] w-[60%] rounded-full" />
          <Skeleton className="h-[1rem] w-[30%] rounded-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[1rem] w-full rounded-full" />
          <Skeleton className="h-[1rem] w-[80%] rounded-full" />
          <Skeleton className="h-[1rem] w-[60%] rounded-full" />
          <Skeleton className="h-[1rem] w-[30%] rounded-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-[10rem] w-full" />
          <Skeleton className="h-[1rem] w-full rounded-full" />
          <Skeleton className="h-[1rem] w-[80%] rounded-full" />
          <Skeleton className="h-[1rem] w-[60%] rounded-full" />
          <Skeleton className="h-[1rem] w-[30%] rounded-full" />
        </div>
      </div>
    </div>
  );
}
