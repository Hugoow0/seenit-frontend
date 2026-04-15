"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Navbar as HeroNavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Link as HeroLink,
    Divider,
} from "@heroui/react";
import { cn } from "@heroui/react";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentLink = usePathname();

    const closeMenu = () => setIsMenuOpen(false);

    // Close menu on route change
    useEffect(() => {
        closeMenu();
    }, [currentLink]);

    return (
        <HeroNavbar
            classNames={{
                base: cn("border-default-100", {
                    "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
                }),
                wrapper: "w-full justify-center",
                item: "hidden md:flex",
            }}
            shouldHideOnScroll
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            disableAnimation={true}
        >
            {/* Left Content */}
            <NavbarBrand>
                <Link href="/" onClick={closeMenu}>
                    <span className="text-large ml-2 font-medium">
                        {siteConfig.name}
                    </span>
                </Link>
            </NavbarBrand>

            {/* Center Content */}
            <NavbarContent justify="center">
                {siteConfig.navItems.map((item, index) => (
                    <NavbarItem key={index}>
                        <HeroLink
                            className={
                                currentLink === item.href
                                    ? "text-white-500 mb-2 w-full"
                                    : "text-default-500 mb-2 w-full"
                            }
                            href={item.href}
                            size="sm"
                            onPress={closeMenu}
                        >
                            {item.label}
                        </HeroLink>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Right Content */}
            <NavbarContent className="hidden md:flex" justify="end">
                <NavbarItem>
                    {/* Placeholder for user profile/settings */}
                </NavbarItem>
            </NavbarContent>

            {/* Mobile Content */}
            <div className="md:hidden">
                {/* Placeholder for user profile/settings */}
            </div>

            <NavbarMenuToggle className="text-default-400 md:hidden" />

            <NavbarMenu className="bg-default-200/50 shadow-medium dark:bg-default-100/50 top-[calc(var(--navbar-height)-1px)] max-h-full pt-6 pb-6 backdrop-blur-md backdrop-saturate-150">
                {siteConfig.navItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <HeroLink
                            className={
                                currentLink === item.href
                                    ? "text-white-500 mb-2 w-full"
                                    : "text-default-500 mb-2 w-full"
                            }
                            href={item.href}
                            size="md"
                        >
                            {item.label}
                        </HeroLink>
                        <Divider className="opacity-50" />
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </HeroNavbar>
    );
};
