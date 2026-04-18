import { siteConfig } from "@/config/site";

import { Snippet } from "@heroui/snippet";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 ">
            <div className="inline-block max-w-xl text-center justify-center">
                <span className={title()}>{siteConfig.name}</span>
                <div className={subtitle({ class: "mt-12" })}>
                    Your new way to discover movies and TV shows.
                </div>
            </div>

            <div className="mt-8">
                <Snippet hideCopyButton hideSymbol variant="bordered">
                    <span>Soon available</span>
                </Snippet>
            </div>
        </section>
    );
}
