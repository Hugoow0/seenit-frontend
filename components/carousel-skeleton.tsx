import { Skeleton } from "@/components/ui/skeleton";

export function CarouselSkeleton() {
    return (
        <div className="space-y-10">
            {/* First carousel skeleton */}
            <div>
                <div className="flex items-center justify-between mb-4 px-4">
                    <Skeleton className="h-8 w-52 rounded-lg" />
                </div>
                <div className="flex gap-4 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="flex-shrink-0">
                            <Skeleton className="h-48 sm:h-48 w-[130px] sm:w-[180px] md:w-[130px] rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Second carousel skeleton */}
            <div>
                <div className="flex items-center justify-between mb-4 px-4">
                    <Skeleton className="h-8 w-52 rounded-lg" />
                </div>
                <div className="flex gap-4 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="flex-shrink-0">
                            <Skeleton className="h-48 sm:h-48 w-[130px] sm:w-[180px] md:w-[130px] rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
