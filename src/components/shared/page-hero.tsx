import Image from "next/image";
import { HeroActions } from "@/components/shared/hero-actions";
import type { PageHeroContent } from "@/lib/content/page-hero";

export function PageHero({ content, titleId }: { content: PageHeroContent; titleId: string }) {
  return (
    <section aria-labelledby={titleId} className="overflow-hidden bg-[#faf7f5] text-[#0d1317]">
      <div className="mx-auto max-w-[600px] px-6 pt-[34px] pb-12 lg:w-[var(--home-content-width)] lg:max-w-none lg:px-0 lg:pt-[calc(24*var(--home-layout-unit))] lg:pb-[calc(40*var(--home-layout-unit))]">
        <div className="relative lg:aspect-[1280/766] lg:[container-type:inline-size]">
          <div aria-hidden="true" className="pointer-events-none relative mr-10 h-[260px] overflow-hidden rounded-[40px] sm:h-[320px] lg:absolute lg:inset-0 lg:mr-0 lg:h-auto lg:overflow-visible lg:rounded-none">
            <picture className="block h-full w-full">
              <source media="(min-width: 1024px)" srcSet={content.background.src} />
              <Image src={content.mobileBackground.src} alt="" width={content.mobileBackground.width} height={content.mobileBackground.height} unoptimized loading="eager" fetchPriority="high" className="h-full w-full object-cover object-left lg:object-fill" />
            </picture>
          </div>
          <div className="absolute top-[160px] right-0 size-[140px] overflow-hidden rounded-[28px] bg-[#faf7f5] sm:top-[200px] sm:size-[160px] lg:top-0 lg:right-0 lg:size-auto lg:aspect-square lg:w-[23.4375%] lg:rounded-[3.75cqw]">
            <Image src={content.image.src} alt={content.image.alt} width={content.image.width} height={content.image.height} loading="eager" sizes="(min-width: 1024px) 21vw, (min-width: 640px) 160px, 140px" className="h-full w-full object-cover" style={{ objectPosition: content.image.position ?? "center", transform: content.image.scale ? `scale(${content.image.scale})` : undefined, transformOrigin: content.image.transformOrigin ?? "center" }} />
          </div>
          <div className="relative mt-16 sm:mt-20 lg:absolute lg:top-[52.741514%] lg:left-0 lg:mt-0 lg:w-[59.84375%]">
            <h1 id={titleId} className="font-sangira text-[37px] leading-[1.1] font-normal tracking-[.03em] sm:text-[44px] lg:text-[calc(72*var(--home-type-unit))]">{content.heading}</h1>
            <p className="mt-6 font-holand text-[15px] leading-[1.25] tracking-[.05em] sm:text-[18px] lg:mt-[2.5cqw] lg:text-[calc(23*var(--home-type-unit))]">{content.introduction}</p>
            <HeroActions actions={content.actions} className="flex" />
          </div>
        </div>
      </div>
    </section>
  );
}
