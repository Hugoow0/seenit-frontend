import { title } from "@/components/primitives";
import Search from "@/components/search";
import SearchResults from "@/components/search-results";
import { Suspense } from "react";
import { Spinner } from "@heroui/spinner";

export default function SearchPage() {
    return (
        <section className="flex flex-col gap-4">
            <div className="inline-block max-w-xl text-center justify-center mx-auto mb-8">
                <h1 className={title()}>Movies</h1>
            </div>
            <div className="mt-8 mb-4 sm:min-w-lg max-w-xl mx-auto flex items-center justify-center">
                <Suspense
                    fallback={
                        <div className="w-full h-12 bg-muted rounded-full animate-pulse"></div>
                    }
                >
                    <Search placeholder="Search movies, tv shows..." />
                </Suspense>
            </div>

            <div className="flex min-h-[calc(100vh-350px)] w-full flex-col pt-8">
                <Suspense
                    fallback={
                        <div className="flex flex-col items-center justify-center p-8">
                            <Spinner size="lg" />
                        </div>
                    }
                >
                    <div className="w-full flex-col">
                        <SearchResults />
                    </div>
                </Suspense>
            </div>
        </section>
    );
}
