import { Suspense } from "react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { fetchTrendingMovies, fetchTrendingTvShows } from "@/lib/api";
import TrendingCarousel from "@/components/trending-carousel";
import { CarouselSkeleton } from "@/components/carousel-skeleton";

async function TrendingContent() {
    const [moviesResponse, tvShowsResponse] = await Promise.all([
        fetchTrendingMovies(),
        fetchTrendingTvShows(),
    ]);

    const hasMovies = moviesResponse.data && !moviesResponse.error;
    const hasTvShows = tvShowsResponse.data && !tvShowsResponse.error;

    return (
        <>
            {hasMovies ? (
                <div>
                    <TrendingCarousel
                        carouselName="Trending Movies"
                        carouselItems={moviesResponse.data}
                        isMovie={true}
                    />
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4 px-4">
                        <h2 className="text-2xl font-bold sm:px-4">
                            Trending Movies
                        </h2>
                    </div>
                    <div className="flex items-center justify-center p-8">
                        <p className="text-gray-500">
                            No trending movies available at the moment.
                        </p>
                    </div>
                </>
            )}

            {hasTvShows ? (
                <div>
                    <TrendingCarousel
                        carouselName="Trending TV Shows"
                        carouselItems={tvShowsResponse.data}
                        isMovie={false}
                    />
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4 px-4">
                        <h2 className="text-2xl font-bold sm:px-4">
                            Trending TV Shows
                        </h2>
                    </div>
                    <div className="flex items-center justify-center p-8">
                        <p className="text-gray-500">
                            No trending TV Shows available at the moment.
                        </p>
                    </div>
                </>
            )}
        </>
    );
}

export default function Home() {
    return (
        <section className="flex flex-col gap-4">
            {/* Hero */}
            <div className="inline-block max-w-xl text-center justify-center mx-auto">
                <span className={title()}>{siteConfig.name}</span>
                <div className={subtitle({ class: "mt-4" })}>
                    Your new way to discover movies and TV shows.
                </div>
            </div>

            {/* Carousels */}
            <div className="mt-8 w-full">
                <Suspense fallback={<CarouselSkeleton />}>
                    <TrendingContent />
                </Suspense>
            </div>
        </section>
    );
}
