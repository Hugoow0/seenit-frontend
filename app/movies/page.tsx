"use client";

import { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import {
    fetchNowPlayingMovies,
    fetchTopRatedMovies,
    fetchTrendingMovies,
} from "@/lib/api";
import TrendingCarousel from "@/components/carousel";
import { CarouselSkeleton } from "@/components/carousel-skeleton";
import type { TrendingResponse } from "@/types/media";

export default function MoviesPage() {
    const [nowPlayingData, setNowPlayingData] =
        useState<TrendingResponse | null>(null);
    const [topRatedData, setTopRatedData] = useState<TrendingResponse | null>(
        null,
    );
    const [trendingData, setTrendingData] = useState<TrendingResponse | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchMoviesData = async () => {
            const [nowPlayingResponse, topRatedResponse, trendingResponse] =
                await Promise.all([
                    fetchNowPlayingMovies(),
                    fetchTopRatedMovies(),
                    fetchTrendingMovies(),
                ]);

            if (!isMounted) {
                return;
            }

            setNowPlayingData(nowPlayingResponse.data);
            setTopRatedData(topRatedResponse.data);
            setTrendingData(trendingResponse.data);
            setIsLoading(false);
        };

        fetchMoviesData().catch(() => {
            if (isMounted) {
                setIsLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const hasNowPlaying = Boolean(nowPlayingData);
    const hasTopRated = Boolean(topRatedData);
    const hasTrending = Boolean(trendingData);

    return (
        <section className="flex flex-col gap-4">
            <div className="inline-block max-w-xl text-center justify-center mx-auto mb-8">
                <h1 className={title()}>Movies</h1>
            </div>

            <div className="w-full">
                {isLoading ? (
                    <CarouselSkeleton />
                ) : (
                    <div className="flex flex-col">
                        {hasTrending ? (
                            <TrendingCarousel
                                carouselName="Trending Movies"
                                carouselItems={trendingData}
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
                                        No Trending Movies available at the
                                        moment.
                                    </p>
                                </div>
                            </>
                        )}

                        {hasNowPlaying ? (
                            <TrendingCarousel
                                carouselName="Now Playing"
                                carouselItems={nowPlayingData}
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
                                        No Now Playing movies available at the
                                        moment.
                                    </p>
                                </div>
                            </>
                        )}

                        {hasTopRated ? (
                            <TrendingCarousel
                                carouselName="Top Rated Movies"
                                carouselItems={topRatedData}
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
                                        No Top Rated Movies available at the
                                        moment.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
