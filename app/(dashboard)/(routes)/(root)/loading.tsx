import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="container mt-6 space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Skeleton className="flex h-[5rem] gap-3 rounded-md p-6" />
        <Skeleton className="flex h-[5rem] gap-3 rounded-md p-6" />
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
