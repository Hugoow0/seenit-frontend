"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import CarouselComponent from "@/components/carousel";
import { fetchSearchResults, SearchResponse } from "@/lib/api";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { SearchIcon } from "lucide-react";

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [queryResults, setQueryResults] = useState<SearchResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const fetchSearchQuery = async () => {
            setErrMsg("");
            if (!query.trim()) {
                setQueryResults(null);
                return;
            }
            setIsLoading(true);
            try {
                const res = await fetchSearchResults(query);
                if (res.data) {
                    console.log("Search results data:", res.data);
                    setQueryResults(res.data);
                } else {
                    setErrMsg(res.error || "Failed to fetch search results");
                    console.log("Search API error:", res.error);
                }
            } catch (error) {
                setErrMsg("An error occurred while fetching search results");
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchQuery();
    }, [query]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <Spinner size="lg" />
            </div>
        );
    }

    if (errMsg) {
        return <div className="text-destructive p-4 text-center">{errMsg}</div>;
    }

    if (!query) {
        return (
            <div className="flex h-full flex-col items-center justify-center py-20">
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <SearchIcon />
                        </EmptyMedia>
                        <EmptyTitle>Start searching</EmptyTitle>
                        <EmptyDescription>
                            Find your favorite movies and TV shows.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
        );
    }

    if (!queryResults) return null;

    const movies = queryResults.movies || [];
    const tvShows = queryResults.tvShows || [];

    if (movies.length === 0 && tvShows.length === 0) {
        return (
            <div className="p-4 text-center text-muted-foreground">
                No results found for &quot;{query}&quot;
            </div>
        );
    }

    return (
        <div className="w-full space-y-8 mt-4">
            {movies.length > 0 && (
                <div className="mb-8">
                    <CarouselComponent
                        carouselName="Movies"
                        carouselItems={{ results: movies } as any}
                        isMovie={true}
                    />
                </div>
            )}

            {tvShows.length > 0 && (
                <div className="mb-8">
                    <CarouselComponent
                        carouselName="TV Shows"
                        carouselItems={{ results: tvShows } as any}
                        isMovie={false}
                    />
                </div>
            )}
        </div>
    );
}
