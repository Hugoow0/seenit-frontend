import { CarouselSkeleton } from "@/components/carousel-skeleton";

export default function Loading() {
    return (
        <section className="flex flex-col items-center justify-center gap-4">
            <div className="inline-block max-w-xl text-center justify-center">
                <div className="h-12 w-48 mx-auto rounded-lg bg-muted animate-pulse" />
                <div className="h-6 w-80 mx-auto mt-4 rounded-lg bg-muted animate-pulse" />
            </div>
            <div className="mt-8 w-full">
                <CarouselSkeleton />
            </div>
        </section>
    );
}
