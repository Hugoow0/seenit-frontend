import { Suspense } from "react";
import { title } from "@/components/primitives";
import {
    fetchTopRatedTvShows,
    fetchPopularTvShows,
    fetchTrendingTvShows,
} from "@/lib/api";
import TrendingCarousel from "@/components/trending-carousel";
import { CarouselSkeleton } from "@/components/carousel-skeleton";

async function TVShowsContent() {
    const [topRatedResponse, popularResponse, trendingResponse] =
        await Promise.all([
            fetchTopRatedTvShows(),
            fetchPopularTvShows(),
            fetchTrendingTvShows(),
        ]);

    const hasTopRated = topRatedResponse.data && !topRatedResponse.error;
    const hasPopular = popularResponse.data && !popularResponse.error;
    const hasTrending = trendingResponse.data && !trendingResponse.error;

    return (
        <div className="flex flex-col">
            {hasTrending ? (
                <TrendingCarousel
                    carouselName="Trending TV Shows"
                    carouselItems={trendingResponse.data}
                    isMovie={false}
                />
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

            {hasPopular ? (
                <TrendingCarousel
                    carouselName="Popular TV Shows"
                    carouselItems={popularResponse.data}
                    isMovie={false}
                />
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4 px-4">
                        <h2 className="text-2xl font-bold sm:px-4">
                            Popular TV Shows
                        </h2>
                    </div>
                    <div className="flex items-center justify-center p-8">
                        <p className="text-gray-500">
                            No Popular TV Shows available at the moment.
                        </p>
                    </div>
                </>
            )}

            {hasTopRated ? (
                <TrendingCarousel
                    carouselName="Top Rated TV Shows"
                    carouselItems={topRatedResponse.data}
                    isMovie={false}
                />
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4 px-4">
                        <h2 className="text-2xl font-bold sm:px-4">
                            Top Rated TV Shows
                        </h2>
                    </div>
                    <div className="flex items-center justify-center p-8">
                        <p className="text-gray-500">
                            No Top Rated TV Shows available at the moment.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default function TVShowsPage() {
    return (
        <section className="flex flex-col gap-4">
            <div className="inline-block max-w-xl text-center justify-center mx-auto mb-8">
                <h1 className={title()}>TV Shows</h1>
            </div>

            <div className="w-full">
                <Suspense fallback={<CarouselSkeleton />}>
                    <TVShowsContent />
                </Suspense>
            </div>
        </section>
    );
}
