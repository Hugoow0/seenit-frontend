import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            suppressHydrationWarning
            lang="en"
            className={cn("font-sans", geist.variable)}
        >
            <head />
            <body
                className={clsx(
                    "min-h-screen text-foreground bg-background font-sans antialiased",
                    fontSans.variable,
                )}
            >
                <Providers
                    themeProps={{ attribute: "class", defaultTheme: "dark" }}
                >
                    <div className="relative flex flex-col min-h-screen">
                        <Navbar />
                        <main className="mx-auto pt-16 px-6 flex-grow w-full">
                            {children}
                        </main>
                        <footer className="w-full flex items-center justify-center py-3">
                            <Link
                                className="flex items-center gap-1 text-current"
                                href="#"
                                title="SeenIt"
                            >
                                <span className="text-default-600">
                                    {siteConfig.name} @{" "}
                                    {new Date().getFullYear()}
                                </span>
                            </Link>
                        </footer>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
