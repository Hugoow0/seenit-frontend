export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "SEENIT",
    description:
        "Make beautiful websites regardless of your design experience.",
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
