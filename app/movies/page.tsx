import { Suspense } from "react";
import { title } from "@/components/primitives";
import {
    fetchNowPlayingMovies,
    fetchTopRatedMovies,
    fetchTrendingMovies,
} from "@/lib/api";
import TrendingCarousel from "@/components/trending-carousel";
import { CarouselSkeleton } from "@/components/carousel-skeleton";

async function MoviesContent() {
    const [nowPlayingResponse, topRatedResponse, trendingResponse] =
        await Promise.all([
            fetchNowPlayingMovies(),
            fetchTopRatedMovies(),
            fetchTrendingMovies(),
        ]);

    const hasNowPlaying = nowPlayingResponse.data && !nowPlayingResponse.error;
    const hasTopRated = topRatedResponse.data && !topRatedResponse.error;
    const hasTrending = trendingResponse.data && !trendingResponse.error;

    return (
        <div className="flex flex-col">
            {hasTrending ? (
                <TrendingCarousel
                    carouselName="Trending Movies"
                    carouselItems={trendingResponse.data}
                    isMovie={true}
                />
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4 px-4">
                        <h2 className="text-2xl font-bold sm:px-4">
                            Trending Movies
                        </h2>
                    </div>
                    <div className="flex items-center justify-center p-8">
                        <p className="text-gray-500">
                            No Trending Movies available at the moment.
                        </p>
                    </div>
                </>
            )}

            {hasNowPlaying ? (
                <TrendingCarousel
                    carouselName="Now Playing"
                    carouselItems={nowPlayingResponse.data}
                    isMovie={true}
                />
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4 px-4">
                        <h2 className="text-2xl font-bold sm:px-4">
                            Now Playing
                        </h2>
                    </div>
                    <div className="flex items-center justify-center p-8">
                        <p className="text-gray-500">
                            No Now Playing movies available at the moment.
                        </p>
                    </div>
                </>
            )}

            {hasTopRated ? (
                <TrendingCarousel
                    carouselName="Top Rated Movies"
                    carouselItems={topRatedResponse.data}
                    isMovie={true}
                />
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4 px-4">
                        <h2 className="text-2xl font-bold sm:px-4">
                            Top Rated Movies
                        </h2>
                    </div>
                    <div className="flex items-center justify-center p-8">
                        <p className="text-gray-500">
                            No Top Rated Movies available at the moment.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default function MoviesPage() {
    return (
        <section className="flex flex-col gap-4">
            <div className="inline-block max-w-xl text-center justify-center mx-auto mb-8">
                <h1 className={title()}>Movies</h1>
            </div>

            <div className="w-full">
                <Suspense fallback={<CarouselSkeleton />}>
                    <MoviesContent />
                </Suspense>
            </div>
        </section>
    );
}
