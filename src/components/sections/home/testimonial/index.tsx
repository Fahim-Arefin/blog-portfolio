import { testimonialContent } from "@/lib/content/testimonial";
import { TestimonialForm } from "./form";

export function ShareTestimonial() {
  const content = testimonialContent;
  return (
    <section id="share-your-testimonial" aria-labelledby="share-testimonial-title" className="scroll-mt-24 bg-white px-6 py-16 text-[#0d1317] lg:px-0 lg:pt-[calc(100*var(--home-type-unit))] lg:pb-[calc(120*var(--home-type-unit))]">
      <div className="mx-auto grid max-w-[600px] gap-10 lg:w-[var(--home-content-width)] lg:max-w-none lg:grid-cols-[552fr_648fr] lg:gap-[calc(80*var(--home-type-unit))]">
        <div className="font-holand tracking-[.05em]">
          <p className="text-[13.5px] leading-[1.25] text-[#4b565b] lg:text-[calc(18*var(--home-type-unit))]">{content.eyebrow}</p>
          <h2 id="share-testimonial-title" className="mt-4 whitespace-pre-line font-sangira text-[27.75px] leading-[1.1] font-normal tracking-[.03em] sm:text-[33px] lg:text-[calc(58*var(--home-type-unit))]">{content.heading}</h2>
          <p className="mt-8 text-[13.5px] leading-[1.5] lg:mt-[calc(48*var(--home-type-unit))] lg:text-[calc(18*var(--home-type-unit))] lg:leading-[1.25]">{content.introduction}</p>
          <aside className="mt-8 rounded-2xl bg-[#c6d7df] p-5 lg:mt-[calc(48*var(--home-type-unit))] lg:p-[calc(32*var(--home-type-unit))]">
            <h3 className="font-sangira text-[21.75px] leading-[1.1] font-normal tracking-[.03em] lg:text-[calc(29*var(--home-type-unit))]">{content.reflectionHeading}</h3>
            <ul className="mt-5 space-y-3 text-[13.5px] leading-[1.25] font-bold lg:text-[calc(18*var(--home-type-unit))]">
              {content.reflections.map((reflection) => <li key={reflection}>• {reflection}</li>)}
            </ul>
          </aside>
          <figure className="mt-8 lg:mt-[calc(48*var(--home-type-unit))]">
            <span aria-hidden="true" className="block h-6 font-sangira text-[120px] leading-[.6] lg:h-[calc(24*var(--home-type-unit))] lg:text-[calc(180*var(--home-type-unit))]">“</span>
            <blockquote className="text-[17.25px] leading-[1.25] font-bold lg:text-[calc(23*var(--home-type-unit))]">{content.quote}</blockquote>
            <figcaption className="mt-3 text-[13.5px] leading-[1.25] lg:text-[calc(18*var(--home-type-unit))]">- {content.attribution}</figcaption>
          </figure>
        </div>
        <TestimonialForm heading={content.formHeading} consent={content.consent} microcopy={content.microcopy} />
      </div>
    </section>
  );
}
