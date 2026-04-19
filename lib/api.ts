import type {
    TrendingResponse,
    MovieDetailsResponse,
    TVShowDetailsResponse,
} from "@/types/media";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface ApiResult<T> {
    data: T | null;
    error: string | null;
}

async function fetchApi<T>(endpoint: string): Promise<ApiResult<T>> {
    try {
        const res = await fetch(`${API_BASE_URL}/api${endpoint}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as T;
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred",
        };
    }
}

// Server-Side Fetch Functions (for RSC / Server Components)
export async function fetchTrendingMovies(): Promise<
    ApiResult<TrendingResponse>
> {
    return fetchApi<TrendingResponse>("/trending/movies");
}

export async function fetchTrendingTvShows(): Promise<
    ApiResult<TrendingResponse>
> {
    return fetchApi<TrendingResponse>("/trending/tvshows");
}

// Client-Side Fetch Functions (for Client Components / on-demand)
export async function fetchMovieDetails(
    id: number,
): Promise<ApiResult<MovieDetailsResponse>> {
    return fetchApi<MovieDetailsResponse>(`/movies/${id}`);
}

export async function fetchTvShowDetails(
    id: number,
): Promise<ApiResult<TVShowDetailsResponse>> {
    return fetchApi<TVShowDetailsResponse>(`/tvshows/${id}`);
}
