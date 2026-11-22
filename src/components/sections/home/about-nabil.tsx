import type { AboutNabilContent } from "@/lib/content/home-sections";

export function AboutNabil({ content }: { content: AboutNabilContent }) {
  return (
    <section id="about-nabil-hossain" aria-labelledby="about-nabil-title" className="scroll-mt-24 bg-[#faf7f5] pt-16 pb-28 text-[#0d1317] lg:pt-[calc(120*var(--home-type-unit))] lg:pb-[calc(160*var(--home-type-unit))]">
      <div className="mx-auto w-[calc(100%_-_48px)] lg:w-[var(--home-content-width)] lg:[container-type:inline-size]">
        <h2 id="about-nabil-title" className="font-sangira text-[27.75px] leading-[1.1] font-normal tracking-[.03em] sm:text-[33px] lg:text-[calc(58*var(--home-type-unit))]">{content.heading}</h2>
        <dl className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:mt-[calc(64*var(--home-type-unit))] lg:grid-cols-3 lg:gap-x-[calc(48*var(--home-type-unit))] lg:gap-y-[calc(40*var(--home-type-unit))]">
          {content.facts.map(({ label, lines }) => (
            <div key={label}>
              <dt className="font-sangira text-[18.75px] leading-[1.1] font-normal tracking-[.03em] lg:text-[calc(29*var(--home-type-unit))]">{label}</dt>
              <dd className="mt-4 font-holand text-[13.5px] leading-[1.5] tracking-[.05em] lg:mt-[calc(16*var(--home-type-unit))] lg:text-[calc(20*var(--home-type-unit))]">
                {lines.map((line, index) => <span className="block" key={`${index}-${line}`}>{line}</span>)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
