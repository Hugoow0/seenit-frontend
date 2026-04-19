"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useIsMobile from "@/hooks/use-media-query";
import Image from "next/image";

import { useState, useEffect } from "react";
import { Loader2, Star, Play, Plus, Heart } from "lucide-react";
import { fetchTvShowDetails } from "@/lib/api";
import type { TVShowDetailsResponse, TVShowSeasonDetails } from "@/types/media";

export default function TvShowDetailsModal({ item }: any) {
    const mobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState<TVShowDetailsResponse | null>(null);
    const [seasonNumber, setSeasonNumber] = useState(1);
    const [selectedSeason, setSelectedSeason] =
        useState<TVShowSeasonDetails | null>(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (details) {
            const foundSeason = details.seasons.find(
                (s) => s.season_number === seasonNumber,
            );
            if (foundSeason) {
                setSelectedSeason(foundSeason);
            }
        }
    }, [details, seasonNumber]);

    const fetchDetails = async () => {
        if (details || isLoading) return;

        setIsLoading(true);
        try {
            const res = await fetchTvShowDetails(item.id);
            if (res.data) setDetails(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const detailContent = (
        <>
            {isLoading ? (
                <div className="flex h-96 items-center justify-center">
                    <Loader2 className="size-8 animate-spin text-zinc-500" />
                </div>
            ) : details ? (
                <>
                    <div className="relative h-[280px] md:h-[520px]">
                        <Image
                            src={`https://image.tmdb.org/t/p/original${details.tvshow?.backdrop_path}`}
                            alt={`${details.tvshow?.name}'s backdrop`}
                            fill
                            className="h-full w-full object-cover mask-[linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
                        />

                        <div className="absolute inset-x-4 bottom-8 flex items-end justify-between md:inset-x-8 md:bottom-10">
                            <div className="flex flex-col">
                                <div className="mb-2 md:mb-4">
                                    <h2 className="text-2xl font-bold text-white md:text-4xl text-left text-shadow-lg/30">
                                        {details.tvshow?.name}
                                    </h2>
                                    <p className="text-md mt-1 italic text-white/70 md:text-lg text-left text-shadow-lg/30">
                                        {details.tvshow?.tagline}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="default"
                                        onClick={() => {
                                            console.log("Play btn clicked");
                                        }}
                                    >
                                        <Play
                                            data-icon="inline-start"
                                            className="fill-black"
                                        />
                                        <span className="text-base">Play</span>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="rounded-full border-2 border-white/50 hover:border-white"
                                        onClick={() => {
                                            console.log("Add btn clicked");
                                        }}
                                    >
                                        <Plus />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="rounded-full border-2 border-white/50 hover:border-white"
                                        onClick={() => {
                                            setLiked(!liked);
                                        }}
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
                            {/* Network Logo */}
                            <div className="flex items-center justify-center-safe size-16 ml-auto">
                                {details.tvshow?.networks[0] ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${details.tvshow?.networks[0].logo_path}`}
                                        alt={details.tvshow?.networks[0].name}
                                        width={64}
                                        height={64}
                                        className="object-contain"
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-4 pt-2 md:p-8 md:pt-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="text-muted-foreground text-sm font-medium md:text-base">
                                        {details.tvshow?.status}
                                        {" • "}
                                        {
                                            details.tvshow?.first_air_date?.split(
                                                "-",
                                            )[0]
                                        }
                                        {details.tvshow?.last_air_date ? (
                                            <>
                                                {" - "}{" "}
                                                {
                                                    details.tvshow?.last_air_date.split(
                                                        "-",
                                                    )[0]
                                                }{" "}
                                            </>
                                        ) : null}{" "}
                                        • {details.tvshow?.number_of_seasons}{" "}
                                        Season
                                        {details.tvshow?.number_of_seasons > 1
                                            ? "s"
                                            : ""}{" "}
                                        • {details.tvshow?.number_of_episodes}{" "}
                                        Episodes •{" "}
                                        <Badge variant="outline">
                                            <Star
                                                color="#ffd500"
                                                data-icon="inline-start"
                                                className="size-3 mr-1"
                                            />
                                            {Math.round(
                                                details.tvshow?.vote_average *
                                                    10,
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
                                    {details.tvshow?.overview
                                        ? details.tvshow?.overview
                                        : "No overview available."}
                                </p>

                                <p className="mb-2">
                                    <span className="text-muted-foreground mr-1">
                                        Genre:
                                    </span>
                                    {details.tvshow?.genres
                                        ?.map((g: any) => g.name)
                                        .join(", ")}
                                </p>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <h4 className="text-base font-semibold md:text-lg">
                                    Seasons & Episodes
                                </h4>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <Select
                                            value={seasonNumber.toString()}
                                            onValueChange={(val) =>
                                                setSeasonNumber(Number(val))
                                            }
                                        >
                                            <SelectTrigger className="w-auto min-w-[110px] h-[30px] border border-muted px-2">
                                                <SelectValue
                                                    placeholder={
                                                        <span className="text-xs font-semibold tracking-wider uppercase">
                                                            Select Season
                                                        </span>
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {details.tvshow?.seasons.map(
                                                    (season: any) => (
                                                        <SelectItem
                                                            key={
                                                                season.season_number
                                                            }
                                                            value={season.season_number.toString()}
                                                        >
                                                            <span className="text-xs font-semibold tracking-wider uppercase">
                                                                {season.name}
                                                            </span>
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <span className="text-muted-foreground text-xs">
                                            {selectedSeason?.episodes?.length ||
                                                0}{" "}
                                            Episodes
                                        </span>
                                    </div>

                                    <div className="space-y-2 md:space-y-3">
                                        {selectedSeason?.episodes?.map(
                                            (episode) => (
                                                <div
                                                    key={episode.id}
                                                    className="flex gap-2 space-y-1 border-l-2 pl-2 md:gap-4 md:pl-4 border-muted hover:border-gray-500 transition-colors"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <Image
                                                            src={
                                                                episode.still_path
                                                                    ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                                                                    : `https://placehold.co/120x68/1a1a1a/666?text=N/A`
                                                            }
                                                            alt={`Episode ${episode.episode_number}: ${episode.name}`}
                                                            width={120}
                                                            height={68}
                                                            className="h-14 w-24 rounded-md object-cover md:h-[68px] md:w-[120px]"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm font-medium">
                                                                Episode{" "}
                                                                {
                                                                    episode.episode_number
                                                                }
                                                            </span>
                                                            {episode.runtime && (
                                                                <span className="text-muted-foreground text-xs">
                                                                    {
                                                                        episode.runtime
                                                                    }{" "}
                                                                    min
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h5 className="font-medium text-sm">
                                                            {episode.name}
                                                        </h5>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Credits */}
                            <div className="space-y-3 border-t pt-6">
                                <div className="text-muted-foreground flex flex-wrap gap-6 text-xs">
                                    {details.tvshow?.created_by?.length > 0 && (
                                        <div>
                                            <span className="text-foreground font-medium">
                                                Creators:
                                            </span>
                                            <br />
                                            {details.tvshow?.created_by
                                                ?.map((c: any) => c.name)
                                                .join(", ")}
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-foreground font-medium">
                                            Company:
                                        </span>
                                        <br />
                                        {details.tvshow?.production_companies
                                            ?.map((c: any) => c.name)
                                            .join(", ")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );

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
                            alt={`${item?.name}'s poster`}
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
                        {detailContent}
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
                    alt={`${item?.name}'s poster`}
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
                    {item?.name || "TV Show Details"}
                </DialogTitle>
                <DialogDescription className="sr-only">
                    Details about {item?.name}
                </DialogDescription>
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {detailContent}
                </div>
            </DialogContent>
        </Dialog>
    );
}
