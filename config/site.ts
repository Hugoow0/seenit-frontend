export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "SEENIT",
    description: "Your new way to discover movies and TV shows.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Movies",
            href: "/movies",
        },
        {
            label: "TV Shows",
            href: "/tv-shows",
        },
        {
            label: "Search",
            href: "/search",
        },
    ],
};
