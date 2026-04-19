// Trending API Types (from GET /api/trending/movies and /api/trending/tvshows)
export interface TrendingMovie {
    id: number;
    title?: string | null;
    overview?: string | null;
    poster_path?: string | null;
    backdrop_path?: string | null;
    media_type?: string;
}

export interface TrendingTvShow {
    id: number;
    name?: string | null;
    overview?: string | null;
    poster_path?: string | null;
    backdrop_path?: string | null;
    media_type?: string;
}

export type TrendingItem = TrendingMovie | TrendingTvShow;

export interface TrendingResponse {
    results: TrendingItem[];
    page: number;
    total_pages: number;
    total_results: number;
}

// Movie Details API Types (from GET /api/movies/:movieId)
export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface MovieDetails {
    id: number;
    title: string;
    overview: string | null;
    vote_average: number;
    release_date: string;
    runtime: number | null;
    status: string;
    genres: Genre[];
    tagline: string | null;
    production_companies: ProductionCompany[];
    adult?: boolean;
    spoken_languages: SpokenLanguage[];
    poster_path: string | null;
    backdrop_path: string | null;
}

export interface CastMember {
    id: number;
    name: string;
}

export interface MovieDetailsResponse {
    movie: MovieDetails;
    credits: CastMember[][];
}

// TV Show Details API Types (from GET /api/tvshows/:tvshowId)
export interface Creator {
    id: number;
    name: string;
}

export interface Network {
    id: number;
    name: string;
    logo_path: string | null;
}

export interface Season {
    id: number;
    season_number: number;
    episode_count: number;
    name: string;
    overview: string | null;
    air_date: string | null;
    poster_path: string | null;
}

export interface TVShowDetails {
    id: number;
    name: string;
    overview: string | null;
    vote_average: number;
    created_by: Creator[];
    first_air_date: string;
    last_air_date: string | null;
    genres: Genre[];
    status: string;
    number_of_episodes: number;
    number_of_seasons: number;
    seasons: Season[];
    adult?: boolean;
    tagline: string | null;
    networks: Network[];
    production_companies: ProductionCompany[];
    poster_path: string | null;
    backdrop_path: string | null;
}

export interface Episode {
    id: number;
    name: string;
    overview: string | null;
    air_date: string | null;
    runtime: number | null;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    episode_number: number;
    season_number: number;
}

export interface TVShowSeasonDetails {
    id: number;
    name: string;
    overview: string | null;
    season_number: number;
    vote_average: number;
    air_date: string | null;
    episodes: Episode[];
}

export interface TVShowDetailsResponse {
    tvshow: TVShowDetails;
    seasons: TVShowSeasonDetails[];
}
