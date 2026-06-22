interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton-shimmer rounded-xl ${className}`} aria-hidden />;
}

/** Skeleton matching the featured listing card layout */
export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-card-border bg-white shadow-card">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/** Skeleton matching a job card layout */
export function JobCardSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-card-border bg-white p-6 shadow-card">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

export default Skeleton;
