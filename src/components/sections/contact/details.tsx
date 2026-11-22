import type { ContactDetailsContent } from "@/lib/content/contact";

const hoverColors: Record<string, string> = {
  LinkedIn: "[--card-hover:#0a66c2]",
  Facebook: "[--card-hover:#0866ff]",
  WhatsApp: "[--card-hover:#25d366]",
  X: "[--card-hover:#000000]",
  Phone: "[--card-hover:#006c67]",
  Email: "[--card-hover:#006c67]",
};

function ContactCard({ link }: { link: ContactDetailsContent["links"][number] }) {
  return (
    <a href={link.href} aria-label={link.label} className={`group/card relative grid h-[calc(160*var(--contact-art-unit))] w-[calc(166*var(--contact-art-unit))] place-items-center rounded-[calc(8*var(--contact-art-unit))] border-2 border-[#c6d7df] bg-[#0d1317] transition-[background-color,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:border-[var(--card-hover)] hover:bg-[var(--card-hover)] focus-visible:border-[var(--card-hover)] focus-visible:bg-[var(--card-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--card-hover)] motion-reduce:transition-none ${hoverColors[link.label] ?? "[--card-hover:#006c67]"}`}>
      <span className={`grid size-[calc(43.892*var(--contact-art-unit))] scale-100 place-items-center rounded-[calc(6.8*var(--contact-art-unit))] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/card:scale-75 group-hover/card:opacity-0 group-focus-visible/card:scale-75 group-focus-visible/card:opacity-0 motion-reduce:transition-none ${link.kind === "x" ? "bg-transparent opacity-100" : "bg-[#c6d7df] opacity-70"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Original local Figma vectors. */}
        <img src={link.icon} alt="" width={link.kind === "x" ? 43.89 : 30.6} height={link.kind === "x" ? 43.89 : 30.6} className={link.kind === "x" ? "size-full" : "h-auto w-[calc(30.6*var(--contact-art-unit))]"} />
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element -- Original local Figma hover variants. */}
      <img src={link.hoverIcon} alt="" width={64} height={64} className={`absolute size-[calc(61.2*var(--contact-art-unit))] scale-[.6] object-contain opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/card:scale-100 group-hover/card:opacity-100 group-focus-visible/card:scale-100 group-focus-visible/card:opacity-100 motion-reduce:transition-none ${link.kind === "x" ? "brightness-0 invert" : ""}`} />
    </a>
  );
}

export function ContactDetails({ content }: { content: ContactDetailsContent }) {
  return (
    <section aria-labelledby="contact-details-title" className="relative bg-[#faf7f5] px-6 pt-12 pb-16 text-[#0d1317] lg:px-0 lg:pt-0 lg:pb-[calc(120*var(--home-type-unit))]">
      <div className="mx-auto max-w-[600px] lg:grid lg:min-h-[calc(426*var(--home-layout-unit))] lg:w-[var(--home-content-width)] lg:max-w-none lg:grid-cols-[420fr_815fr] lg:gap-[calc(45*var(--home-layout-unit))]">
        <nav aria-label="Connect with Nabil Hossain" className="relative z-10 mx-auto h-[calc(560*var(--contact-art-unit))] w-[calc(420*var(--contact-art-unit))] [--contact-art-unit:calc(min(100vw_-_48px,360px)/420)] lg:m-0 lg:h-[calc(426*var(--contact-art-unit))] lg:[--contact-art-unit:var(--home-layout-unit)]">
          {[content.links.slice(0, 3), content.links.slice(3)].map((links, index) => (
            <div key={index} className={`absolute grid w-[calc(190*var(--contact-art-unit))] origin-top-left gap-[calc(12*var(--contact-art-unit))] rounded-[calc(16*var(--contact-art-unit))] bg-[#0d1317] p-[calc(12*var(--contact-art-unit))] ${index === 0 ? "top-0 left-[calc(10*var(--contact-art-unit))] -rotate-5 lg:top-[calc(-139*var(--contact-art-unit))]" : "top-[calc(24*var(--contact-art-unit))] left-[calc(232.4*var(--contact-art-unit))] rotate-3 lg:top-[calc(-115*var(--contact-art-unit))]"}`}>
              {links.map((link) => <ContactCard key={link.label} link={link} />)}
            </div>
          ))}
        </nav>
        <div className="mt-6 font-holand lg:mt-[calc(114*var(--home-layout-unit))]">
          <p className="text-[13.5px] leading-[1.25] tracking-[.05em] text-[#4b565b] lg:text-[calc(18*var(--home-type-unit))]">{content.eyebrow}</p>
          <h2 id="contact-details-title" className="mt-3 font-sangira text-[27.75px] leading-[1.1] font-normal tracking-[.03em] sm:text-[33px] lg:mt-[calc(16*var(--home-type-unit))] lg:text-[calc(37*var(--home-type-unit))]">{content.heading}</h2>
          <p className="mt-6 text-[17.25px] leading-[1.25] font-bold tracking-[.05em] lg:mt-[calc(24*var(--home-type-unit))] lg:text-[calc(23*var(--home-type-unit))]">{content.introduction}</p>
          <p className="mt-6 text-[13.5px] leading-[1.5] tracking-[.05em] lg:mt-[calc(24*var(--home-type-unit))] lg:text-[calc(18*var(--home-type-unit))] lg:leading-[1.25]">{content.description}</p>
        </div>
      </div>
    </section>
  );
}
