import Image from "next/image";
import type { BigPictureContent } from "@/lib/content/home-sections";

const decorationClasses = {
  underline: "after:absolute after:-right-3 after:-bottom-1 after:left-0 after:border-b after:border-[#c4bba9] lg:after:-right-[calc(21*var(--home-type-unit))]",
  dotted: "after:absolute after:-right-3 after:-bottom-1 after:left-0 after:border-b-2 after:border-dotted after:border-[#7b949e] lg:after:-right-[calc(21*var(--home-type-unit))]",
  oval: "after:pointer-events-none after:absolute after:-inset-x-5 after:-top-1.5 after:h-[1.6em] after:rounded-[50%] after:border after:border-[#7c9296] after:-rotate-3 lg:after:-top-[calc(9*var(--home-type-unit))] lg:after:-right-[calc(62.333*var(--home-type-unit))] lg:after:-left-[calc(20.666*var(--home-type-unit))] lg:after:h-[calc(50*var(--home-type-unit))]",
  none: "",
} as const;

export function BigPicture({ content }: { content: BigPictureContent }) {
  return (
    <section id="the-big-picture" aria-labelledby="big-picture-title" className="relative scroll-mt-24 bg-[#c6d7df] pt-12 pb-16 text-[#0d1317] lg:pt-[calc(120*var(--home-type-unit))] lg:pb-[calc(160*var(--home-type-unit))]">
      <figure className="relative mx-auto -mt-24 mb-10 w-[220px] lg:absolute lg:top-0 lg:right-[calc((100%_-_var(--home-content-width))/2)] lg:m-0 lg:w-[calc(330*var(--home-type-unit))] lg:-translate-y-1/2">
        <Image src={content.image.src} alt={content.image.alt} width={content.image.width} height={content.image.height} loading="lazy" unoptimized className="h-auto w-full" />
      </figure>
      <div className="mx-auto w-[calc(100%_-_48px)] lg:w-[calc(var(--home-content-width)*.875)] lg:[container-type:inline-size]">
        <h2 id="big-picture-title" className="font-holand text-[13.5px] leading-[1.25] font-bold tracking-[.05em] lg:text-[calc(18*var(--home-type-unit))]">{content.heading}</h2>
        <dl className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-[calc(64*var(--home-type-unit))] lg:grid-cols-3 lg:gap-x-[calc(48*var(--home-type-unit))] lg:gap-y-[calc(64*var(--home-type-unit))]">
          {content.facts.map(({ label, answer, decoration }) => (
            <div key={label}>
              <dt className="font-holand text-[12px] leading-[1.25] font-bold tracking-[.05em] text-[#4b565b] lg:text-[calc(18*var(--home-type-unit))]">{label}</dt>
              <dd className="mt-3 font-sangira text-[21.75px] leading-[1.1] font-normal tracking-[.03em] lg:mt-[calc(16*var(--home-type-unit))] lg:text-[calc(29*var(--home-type-unit))]">
                <span className={`relative inline-block max-w-full whitespace-pre-line ${decorationClasses[decoration]}`}>{answer}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
