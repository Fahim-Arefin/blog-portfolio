import Image from "next/image";
import Link from "next/link";
import type { HomeHeroContent } from "@/lib/content/home";

export function HeroActions({ actions, className = "hidden lg:flex" }: { actions: HomeHeroContent["actions"]; className?: string }) {
  return (
            <div className={`mt-8 flex-wrap gap-2 sm:gap-4 lg:mt-[2.5cqw] lg:gap-[3.125cqw] ${className}`}>
              {actions.map(({ label, href, tone }) => (
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  className="group inline-flex min-h-11 items-stretch gap-[3px] font-holand text-[13.5px] leading-[1.25] font-bold tracking-[0.05em] focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d1317] lg:min-h-[4.296875cqw] lg:gap-[.3125cqw] lg:text-[calc(18*var(--home-type-unit))]"
                >
                  <span aria-hidden="true" className={`grid size-11 shrink-0 place-items-center overflow-hidden rounded-tl-2xl rounded-tr-lg rounded-br-lg rounded-bl-sm text-2xl font-normal lg:size-[4.296875cqw] lg:rounded-tl-[1.25cqw] lg:rounded-tr-[.625cqw] lg:rounded-br-[.625cqw] lg:rounded-bl-[.3125cqw] ${tone === "dark" ? "bg-[#0d1317] text-[#faf7f5]" : "bg-[#c6d7df] text-[#0d1317]"}`}>
                    <span className="inline-flex w-[13.5px] items-center motion-safe:group-hover:animate-arrow-return motion-safe:group-focus-visible:animate-arrow-return lg:w-[1.40625cqw]">
                      <Image
                        src={tone === "dark" ? "/icons/arrow-right-light.png" : "/icons/arrow-right-dark.png"}
                        alt=""
                        width={tone === "dark" ? 512 : 832}
                        height={tone === "dark" ? 316 : 512}
                        unoptimized
                        className="block h-auto w-full"
                      />
                    </span>
                  </span>
                  <span className={`flex items-center rounded-tl-sm rounded-tr-sm rounded-br-2xl rounded-bl-sm px-3 py-2.5 lg:rounded-tl-[.3125cqw] lg:rounded-tr-[.3125cqw] lg:rounded-br-[1.25cqw] lg:rounded-bl-[.3125cqw] lg:px-[1.875cqw] lg:py-[1.25cqw] ${tone === "dark" ? "bg-[#0d1317] text-[#faf7f5]" : "bg-[#c6d7df] text-[#0d1317]"}`}>{label}</span>
                </Link>
              ))}
            </div>
  );
}
