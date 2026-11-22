"use client";

import { useState } from "react";

export function ContactQuoteMarquee({ quote }: { quote: string }) {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-label="A thought on connection" className="group/marquee relative bg-[#0d1317] py-5 text-[#faf7f5] lg:py-[calc(28*var(--home-type-unit))]">
      <blockquote className="sr-only">{quote}</blockquote>
      <div aria-hidden="true" className="overflow-hidden font-sangira text-[21.75px] leading-[1.1] tracking-[.03em] lg:text-[calc(29*var(--home-type-unit))] motion-reduce:hidden">
        <div data-paused={paused} className="flex w-max motion-safe:[animation:contact-marquee_38s_linear_infinite] data-[paused=true]:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]">
          {[0, 1].map((copy) => <p key={copy} className="shrink-0 pr-16 whitespace-nowrap">{quote}</p>)}
        </div>
      </div>
      <p aria-hidden="true" className="hidden px-6 text-center font-sangira text-[21.75px] leading-[1.3] tracking-[.03em] lg:text-[calc(29*var(--home-type-unit))] motion-reduce:block">{quote}</p>
      <button type="button" aria-label={paused ? "Play quote marquee" : "Pause quote marquee"} aria-pressed={paused} onClick={() => setPaused(!paused)} className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-[#0d1317]/90 text-sm text-[#faf7f5] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6d7df] lg:opacity-0 lg:group-hover/marquee:opacity-100 lg:focus-visible:opacity-100 motion-reduce:hidden">
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
      </button>
    </section>
  );
}
