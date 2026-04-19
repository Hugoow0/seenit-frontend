"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import MovieDetailsModal from "@/components/movie-details-modal";
import TvShowDetailsModal from "@/components/tvshow-details-modal";

interface TrendingCarouselProps {
    carouselName: string;
    carouselItems: any;
    isMovie: boolean;
}

export default function TrendingCarousel({
    carouselName,
    carouselItems,
    isMovie,
}: TrendingCarouselProps) {
    if (!carouselItems?.results?.length) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-gray-500 dark:text-gray-400">
                    No {carouselName.toLowerCase()} available at the moment.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4 px-4">
                <h2 className="text-2xl font-bold sm:px-4">{carouselName}</h2>
            </div>
            <div className="relative w-full overflow-hidden">
                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: 1,
                        containScroll: "trimSnaps",
                        dragFree: true,
                    }}
                    className="mx-2 sm:mx-8 md:mx-12 lg:mx-16"
                >
                    <CarouselContent className="-ml-2">
                        {carouselItems.results.map((item: any) => (
                            <CarouselItem
                                key={item.id}
                                className="basis-auto my-4 px-2 overflow-hidden rounded-lg shadow-md hover:scale-110 transition-transform duration-300"
                            >
                                {isMovie ? (
                                    <MovieDetailsModal item={item} />
                                ) : (
                                    <TvShowDetailsModal item={item} />
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </>
    );
}
