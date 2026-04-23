"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useIsMobile from "@/hooks/use-media-query";
import Image from "next/image";

import { useState, useEffect } from "react";
import { Loader2, Star, Play, Plus, Heart, X } from "lucide-react";
import { fetchMovieDetails } from "@/lib/api";
import type { MovieDetailsResponse } from "@/types/media";

export default function MovieDetailsModal({ item }: any) {
    const mobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState<MovieDetailsResponse | null>(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const storedLikes = localStorage.getItem("seenit-userLiked");
        if (storedLikes) {
            try {
                const parsedLikes = JSON.parse(storedLikes);
                if (parsedLikes.movieIds?.includes(item.id)) {
                    setLiked(true);
                }
            } catch (e) {
                console.error("Failed to parse userLiked from localStorage", e);
            }
        }
    }, [item.id]);

    const handleLike = () => {
        const storedLikes = localStorage.getItem("seenit-userLiked");
        let parsedLikes = {
            movieIds: [] as number[],
            tvshowIds: [] as number[],
        };

        if (storedLikes) {
            try {
                parsedLikes = JSON.parse(storedLikes);
            } catch (e) {}
        }

        parsedLikes.movieIds = parsedLikes.movieIds || [];
        parsedLikes.tvshowIds = parsedLikes.tvshowIds || [];

        const isLiked = !liked;
        setLiked(isLiked);

        if (isLiked) {
            if (!parsedLikes.movieIds.includes(item.id)) {
                parsedLikes.movieIds.push(item.id);
            }
        } else {
            parsedLikes.movieIds = parsedLikes.movieIds.filter(
                (id: number) => id !== item.id,
            );
        }

        localStorage.setItem("seenit-userLiked", JSON.stringify(parsedLikes));
    };

    const fetchDetails = async () => {
        if (details || isLoading) return;

        setIsLoading(true);
        try {
            const res = await fetchMovieDetails(item.id);
            if (res.data) setDetails(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (mobile) {
        return (
            <Drawer
                onOpenChange={(open) => {
                    if (open) fetchDetails();
                }}
            >
                <DrawerTrigger asChild>
                    <div
                        style={{
                            borderRadius: "12px",
                        }}
                        className="flex max-w-[120px] sm:max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
                    >
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                            alt={`${item?.title}'s poster`}
                            width={270}
                            height={405}
                            className="h-48 w-full object-cover"
                        />
                    </div>
                </DrawerTrigger>
                <DrawerContent className="max-h-[70vh] bg-[color-mix(in_oklab,var(--background)_50%,var(--muted)_50%)] p-0">
                    <div className="overflow-y-auto max-h-[90vh] object-cover mask-[linear-gradient(to_bottom,transparent_0%,black_6%)]">
                        <DrawerTitle />
                        <DrawerDescription />
                        {isLoading ? (
                            <div className="flex h-96 items-center justify-center">
                                <Loader2 className="size-8 animate-spin text-zinc-500" />
                            </div>
                        ) : details ? (
                            <>
                                <div className="relative h-[280px] overflow-hidden top-4">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${details.movie?.backdrop_path}`}
                                        alt={details.movie?.title}
                                        fill
                                        className="object-cover mask-[linear-gradient(to_bottom,transparent_0%,black_3%,black_70%,transparent_100%)]"
                                    />
                                    <div className="absolute inset-x-4 bottom-8">
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-2xl font-bold text-white text-shadow-lg/30">
                                                    {details.movie?.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    disabled
                                                    variant="default"
                                                    onClick={() => {
                                                        console.log(
                                                            "Play btn clicked",
                                                        );
                                                    }}
                                                >
                                                    <Play
                                                        data-icon="inline-start"
                                                        className="fill-black"
                                                    />
                                                    <span className="text-base">
                                                        Play
                                                    </span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-full border-2 border-white"
                                                    onClick={() => {
                                                        console.log(
                                                            "Add btn clicked",
                                                        );
                                                    }}
                                                >
                                                    <Plus />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-full border-2 border-white"
                                                    onClick={handleLike}
                                                >
                                                    <Heart
                                                        className={
                                                            liked
                                                                ? "fill-red-500 text-red-500"
                                                                : ""
                                                        }
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 pt-2">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <div className="text-muted-foreground text-sm font-medium md:text-base">
                                                    {details.movie?.status}
                                                    {" • "}
                                                    {
                                                        details.movie
                                                            ?.release_date
                                                    }
                                                    {" • "}
                                                    {details.movie?.runtime} min
                                                    {" • "}
                                                    <Badge variant="outline">
                                                        <Star
                                                            color="#ffd500"
                                                            data-icon="inline-start"
                                                            className="size-3 mr-1"
                                                        />
                                                        {Math.round(
                                                            details.movie
                                                                ?.vote_average *
                                                                10,
                                                        ) / 10}
                                                    </Badge>{" "}
                                                </div>
                                                <span className="rounded-xs border border-white/50 px-1.5 py-0.5 text-xs leading-none">
                                                    HD
                                                </span>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="text-foreground flex w-full flex-col gap-2 text-sm md:w-52">
                                            <span className="text-sm italic text-white/70 md:text-lg text-left text-shadow-lg/30">
                                                {details.movie?.tagline}
                                            </span>
                                            <h4 className="text-base font-semibold md:text-lg">
                                                Overview
                                            </h4>

                                            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                                                {details.movie?.overview
                                                    ? details.movie?.overview
                                                    : "No overview available."}
                                            </p>

                                            <p className="mb-2">
                                                <span className="text-muted-foreground mr-1">
                                                    Genre:
                                                </span>
                                                {details.movie?.genres
                                                    ?.map((g: any) => g.name)
                                                    .join(", ")}
                                            </p>

                                            <p className="mb-2">
                                                <span className="text-muted-foreground mr-1">
                                                    Cast:
                                                </span>
                                                {details?.credits[0]
                                                    ?.map((g: any) => g.name)
                                                    .join(", ")}
                                                , ...
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 md:space-y-6 mt-4">
                                        <div className="space-y-3 border-t pt-6">
                                            <div className="text-muted-foreground flex flex-wrap gap-6 text-xs">
                                                <div>
                                                    <span className="text-foreground font-medium">
                                                        Company:
                                                    </span>
                                                    <br />
                                                    {details.movie?.production_companies
                                                        ?.map(
                                                            (c: any) => c.name,
                                                        )
                                                        .join(", ")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog>
            <DialogTrigger
                onClick={() => fetchDetails()}
                style={{
                    borderRadius: "12px",
                }}
                className="flex max-w-[120px] sm:max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 cursor-pointer"
            >
                <Image
                    src={`https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                    alt={`${item?.title || item?.name}'s poster`}
                    width={270}
                    height={405}
                    className="h-48 w-full object-cover"
                />
            </DialogTrigger>
            <DialogContent
                style={{ borderRadius: "24px" }}
                className="w-full max-w-[920px] h-[80vh] overflow-hidden rounded-3xl border bg-[color-mix(in_oklab,var(--background)_50%,var(--muted)_50%)] p-0 flex flex-col [&>button]:z-50"
            >
                <DialogTitle className="sr-only">
                    {item?.title || "Movie Details"}
                </DialogTitle>
                <DialogDescription className="sr-only">
                    Details about {item?.title}
                </DialogDescription>
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center">
                            <Loader2 className="size-12 animate-spin text-zinc-500" />
                        </div>
                    ) : details ? (
                        <>
                            <div className="relative h-[280px] md:h-[520px]">
                                <Image
                                    src={`https://image.tmdb.org/t/p/original${details.movie?.backdrop_path}`}
                                    alt={`${details.movie?.title}'s backdrop`}
                                    fill
                                    className="h-full w-full object-cover mask-[linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
                                />

                                <div className="absolute inset-x-4 bottom-8 flex items-end justify-between md:inset-x-8 md:bottom-10">
                                    <div className="flex flex-col">
                                        <div className="mb-2 md:mb-4">
                                            <h2 className="text-2xl font-bold text-white md:text-4xl text-left text-shadow-lg/30">
                                                {details.movie?.title}
                                            </h2>
                                            <p className="text-md mt-1 italic text-white/70 md:text-lg text-left text-shadow-lg/30">
                                                {details.movie?.tagline}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                disabled
                                                variant="default"
                                                onClick={() => {
                                                    console.log(
                                                        "Play btn clicked",
                                                    );
                                                }}
                                            >
                                                <Play
                                                    data-icon="inline-start"
                                                    className="fill-black"
                                                />
                                                <span className="text-base">
                                                    Play
                                                </span>
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="rounded-full border-2 border-white/50 hover:border-white"
                                                onClick={() => {
                                                    console.log(
                                                        "Add btn clicked",
                                                    );
                                                }}
                                            >
                                                <Plus />
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="rounded-full border-2 border-white/50 hover:border-white"
                                                onClick={handleLike}
                                            >
                                                <Heart
                                                    className={
                                                        liked
                                                            ? "fill-red-500 text-red-500"
                                                            : ""
                                                    }
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full p-4 pt-2 md:p-8 md:pt-4">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <div className="text-muted-foreground text-sm font-medium md:text-base">
                                                {details.movie?.status}
                                                {" • "}
                                                {details.movie?.release_date}
                                                {" • "}
                                                {details.movie?.runtime} min
                                                {" • "}
                                                <Badge variant="outline">
                                                    <Star
                                                        color="#ffd500"
                                                        data-icon="inline-start"
                                                        className="size-3 mr-1"
                                                    />
                                                    {Math.round(
                                                        details.movie
                                                            ?.vote_average * 10,
                                                    ) / 10}
                                                </Badge>
                                            </div>
                                            <span className="rounded-xs border border-white/50 px-1.5 py-0.5 text-xs leading-none">
                                                HD
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6 mt-6">
                                    <div className="space-y-2">
                                        <h4 className="text-base font-semibold md:text-lg">
                                            Overview
                                        </h4>

                                        <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                                            {details.movie?.overview
                                                ? details.movie?.overview
                                                : "No overview available."}
                                        </p>

                                        <p className="mb-2">
                                            <span className="text-muted-foreground mr-1">
                                                Genre:
                                            </span>
                                            {details.movie?.genres
                                                ?.map((g: any) => g.name)
                                                .join(", ")}
                                        </p>

                                        <p className="mb-2">
                                            <span className="text-muted-foreground mr-1">
                                                Cast:
                                            </span>
                                            {details?.credits[0]
                                                ?.map((g: any) => g.name)
                                                .join(", ")}
                                            , ...
                                        </p>
                                    </div>

                                    <div className="space-y-3 border-t pt-6">
                                        <div className="text-muted-foreground flex flex-wrap gap-6 text-xs">
                                            <div>
                                                <span className="text-foreground font-medium">
                                                    Company:
                                                </span>
                                                <br />
                                                {details.movie?.production_companies
                                                    ?.map((c: any) => c.name)
                                                    .join(", ")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    );
}
