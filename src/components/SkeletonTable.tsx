import { Skeleton } from "./ui/skeleton";

export const SkeletonTable = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border border-x-0 border-t-0 border-b-primary/20 px-4 py-2">
        <div className="w-1/6">
          <Skeleton className="h-4 w-[50%] bg-primary/10" />
        </div>
        <div className="w-1/4">
          <Skeleton className="h-4 w-[50%] bg-primary/10" />
        </div>
        <div className="w-1/5">
          <Skeleton className="h-4 w-[50%] bg-primary/10" />
        </div>
        <div className="w-1/6">
          <Skeleton className="h-4 w-[50%] bg-primary/10" />
        </div>
        <div className="w-1/12">
          <Skeleton className="h-4 w-[50%] bg-primary/10" />
        </div>
      </div>

      <div className="divide-y divide-primary/20">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3"
          >
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-4 w-1/12" />
          </div>
        ))}
      </div>
    </div>
  );
};
