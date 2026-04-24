"use client";

import { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import {
    fetchTopRatedTvShows,
    fetchPopularTvShows,
    fetchTrendingTvShows,
} from "@/lib/api";
import TrendingCarousel from "@/components/carousel";
import { CarouselSkeleton } from "@/components/carousel-skeleton";
import type { TrendingResponse } from "@/types/media";

export default function TVShowsPage() {
    const [topRatedData, setTopRatedData] = useState<TrendingResponse | null>(
        null,
    );
    const [popularData, setPopularData] = useState<TrendingResponse | null>(
        null,
    );
    const [trendingData, setTrendingData] = useState<TrendingResponse | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchTvShowsData = async () => {
            const [topRatedResponse, popularResponse, trendingResponse] =
                await Promise.all([
                    fetchTopRatedTvShows(),
                    fetchPopularTvShows(),
                    fetchTrendingTvShows(),
                ]);

            if (!isMounted) {
                return;
            }

            setTopRatedData(topRatedResponse.data);
            setPopularData(popularResponse.data);
            setTrendingData(trendingResponse.data);
            setIsLoading(false);
        };

        fetchTvShowsData().catch(() => {
            if (isMounted) {
                setIsLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const hasTopRated = Boolean(topRatedData);
    const hasPopular = Boolean(popularData);
    const hasTrending = Boolean(trendingData);

    return (
        <section className="flex flex-col gap-4">
            <div className="inline-block max-w-xl text-center justify-center mx-auto mb-8">
                <h1 className={title()}>TV Shows</h1>
            </div>

            <div className="w-full">
                {isLoading ? (
                    <CarouselSkeleton />
                ) : (
                    <div className="flex flex-col">
                        {hasTrending ? (
                            <TrendingCarousel
                                carouselName="Trending TV Shows"
                                carouselItems={trendingData}
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
                                        No trending TV Shows available at the
                                        moment.
                                    </p>
                                </div>
                            </>
                        )}

                        {hasPopular ? (
                            <TrendingCarousel
                                carouselName="Popular TV Shows"
                                carouselItems={popularData}
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
                                        No Popular TV Shows available at the
                                        moment.
                                    </p>
                                </div>
                            </>
                        )}

                        {hasTopRated ? (
                            <TrendingCarousel
                                carouselName="Top Rated TV Shows"
                                carouselItems={topRatedData}
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
                                        No Top Rated TV Shows available at the
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
