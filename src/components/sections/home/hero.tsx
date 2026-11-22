import Image from "next/image";
import { HeroActions } from "@/components/shared/hero-actions";
import type { HomeHeroContent } from "@/lib/content/home";

export function HomeHero({ content }: { content: HomeHeroContent }) {
  return (
    <section aria-labelledby="home-hero-title" className="overflow-hidden bg-[#faf7f5] text-[#0d1317]">
      {/* Fit the artwork and reduced 24px/40px padding beneath the 80px header. */}
      <div className="mx-auto pt-[34px] pb-[30px] lg:w-[var(--home-content-width)] lg:pt-[calc(24*var(--home-layout-unit))] lg:pb-[calc(40*var(--home-layout-unit))]">
        <div className="relative isolate mx-auto min-h-[720px] max-w-[600px] lg:aspect-[1280/766] lg:min-h-0 lg:max-w-none lg:[container-type:inline-size]">
          {/* Scalable outline follows the rounded, subtracted panels in Figma. */}
          <svg aria-hidden="true" width="0" height="0" className="absolute">
            <defs>
              <clipPath id="home-hero-artwork" clipPathUnits="objectBoundingBox">
                <path transform="scale(.00078125 .001305483)" d="M80 0H850Q930 0 930 80V270Q930 350 1010 350H1200Q1280 350 1280 430V686Q1280 766 1200 766H942Q862 766 862 686V430Q862 350 782 350H80Q0 350 0 270V80Q0 0 80 0Z" />
              </clipPath>
            </defs>
          </svg>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
            <div className="absolute inset-0 hidden overflow-hidden bg-[#c6d7df] [clip-path:url(#home-hero-artwork)] lg:block">
              <Image
                src={content.background.src}
                alt=""
                width={content.background.width}
                height={content.background.height}
                unoptimized
                loading="eager"
                sizes="88.89vw"
                className="absolute top-0 left-0 h-full w-[101.171875%] max-w-none"
              />
            </div>
            <div className="absolute top-0 right-0 h-[300px] w-[83%] overflow-hidden rounded-l-[60px] bg-[#c6d7df] lg:hidden">
              {/* Reuse the upper 350px stats area of Figma's 766px texture. */}
              <Image src={content.background.src} alt="" width={content.background.width} height={content.background.height} unoptimized loading="eager" className="absolute top-0 left-0 h-[218.857143%] w-auto max-w-none" />
            </div>
            <div className="absolute top-[312px] right-[22px] bottom-0 left-0 overflow-hidden rounded-r-[60px] bg-[#536267] lg:hidden">
              <Image src={content.background.src} alt="" fill unoptimized loading="eager" sizes="(min-width: 600px) 578px, 100vw" className="object-cover object-right-bottom" />
            </div>
            <div className="absolute -top-px right-0 hidden aspect-square w-[23.4375%] rounded-[48px] bg-[#c6d7df] lg:block lg:rounded-[3.75cqw]" />
          </div>

            <div className="pointer-events-none absolute top-[244px] right-[22px] bottom-0 -z-10 w-[calc(100%_-_22px)] max-w-[368px] overflow-hidden lg:top-[14.099217%] lg:right-0 lg:w-[39.21875%] lg:max-w-none">
              {/* Preserve the original file and reproduce Figma's normalized image crop. */}
              <Image
                src={content.portrait.src}
                alt={content.portrait.alt}
                width={content.portrait.width}
                height={content.portrait.height}
                unoptimized
                sizes="(min-width: 1024px) 68vw, (min-width: 390px) 718px, calc(195.085vw - 42.9187px)"
                loading="eager"
                fetchPriority="high"
                className="absolute top-0 left-0 h-auto w-[195.085%] max-w-none -translate-x-[25.042%] -translate-y-[23.476%]"
              />
            </div>
          <div aria-hidden="true" className="pointer-events-none absolute top-[312px] right-[22px] bottom-0 left-0 -z-10 rounded-r-[60px] bg-linear-to-b from-transparent via-black/25 to-black/15 lg:hidden" />

          <dl className="absolute top-[84px] right-[22px] left-[calc(17%+22px)] grid grid-cols-2 gap-x-[60px] gap-y-7 text-right lg:top-[18.929504%] lg:right-auto lg:left-0 lg:w-[72.578125%] lg:grid-cols-[174fr_194fr_155fr_168fr] lg:gap-x-[4.114583cqw] lg:px-[3.125cqw]">
            {content.statistics.map(({ value, label }) => (
              <div key={label} className="flex min-w-0 flex-col gap-1.5 lg:gap-[.46875cqw] lg:px-[2.5cqw]">
                <dt className="order-2 w-max self-end whitespace-nowrap font-holand text-[15px] leading-[1.25] tracking-[0.05em] lg:text-[max(12px,calc(15*var(--home-type-unit)))]">{label}</dt>
                <dd className="order-1 font-sangira text-[28px] leading-[1.1] font-normal tracking-[0.03em] lg:text-[calc(37*var(--home-type-unit))]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="relative px-7 pt-[416px] pb-16 text-[#faf7f5] lg:absolute lg:top-[52.741514%] lg:left-0 lg:w-[73.671875%] lg:px-0 lg:pt-0 lg:pb-0 lg:text-[#0d1317]">
            <h1 id="home-hero-title" className="font-sangira text-[37px] leading-[1.1] font-normal tracking-[0.03em] sm:text-[44px] lg:whitespace-nowrap lg:text-[calc(72*var(--home-type-unit))]">
              {content.heading}
            </h1>
            <p className="mt-6 max-w-[766px] font-holand text-[15px] leading-[1.25] font-normal tracking-[0.05em] sm:text-[18px] lg:mt-[2.5cqw] lg:w-[81.230117%] lg:max-w-none lg:text-[calc(23*var(--home-type-unit))]">
              {content.introduction}
            </p>
            <HeroActions actions={content.actions} />
          </div>
        </div>
      </div>
    </section>
  );
}
