import Link from "next/link";
import type { FooterContent } from "@/lib/content/footer";
import { FooterNewsletter } from "./footer-newsletter";

const focusClasses = "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6d7df]";

export function SiteFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="mt-auto rounded-t-[32px] bg-[#0d1317] px-5 py-10 font-holand text-[#faf7f5] tracking-[.05em] [--footer-type-unit:var(--home-type-unit)] lg:px-0 lg:pt-[clamp(80px,8.333333vw,132px)] lg:pb-[clamp(56px,5.555556vw,88px)]">
      <div className="mx-auto flex max-w-[600px] flex-col gap-10 lg:w-[88.888889%] lg:max-w-none lg:gap-[calc(56*var(--footer-type-unit))]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <Link href="/" aria-label="Nabil Hossain — Home" className={`w-fit shrink-0 ${focusClasses}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Original local Figma vector wordmark. */}
            <img src="/images/brand/nabil-logo-light.svg" alt="Nabil Hossain" width={353.842} height={135} className="h-[45px] w-auto lg:h-[calc(135*var(--footer-type-unit))]" />
          </Link>
          <p className="font-sangira text-[21.75px] leading-[1.1] font-normal tracking-[.03em] lg:text-right lg:text-[calc(37*var(--footer-type-unit))]">{content.tagline}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(360px,28.125%)]">
          <div className="grid gap-10 lg:grid-cols-[180px_auto] lg:gap-20">
            <section aria-labelledby="footer-contact-title">
              <h2 id="footer-contact-title" className="text-[17.25px] leading-[1.25] font-bold lg:text-[calc(23*var(--footer-type-unit))]">{content.contact.heading}</h2>
              <address className="mt-4 flex flex-col items-start gap-2 text-[13.5px] leading-[1.25] not-italic lg:gap-1.5 lg:text-[calc(15*var(--footer-type-unit))]">
                <p className="whitespace-nowrap">{content.contact.address}</p>
                <a href={`mailto:${content.contact.email}`} className={focusClasses}>{content.contact.email}</a>
                <a href={`tel:${content.contact.phone}`} className={focusClasses}>{content.contact.phone}</a>
              </address>
            </section>
            <nav aria-labelledby="footer-social-title">
              <h2 id="footer-social-title" className="text-[17.25px] leading-[1.25] font-bold lg:text-[calc(23*var(--footer-type-unit))]">{content.socialHeading}</h2>
              <ul className="mt-4 flex flex-wrap gap-3 lg:gap-[9.116px]">
                {content.socialLinks.map(({ label, href, icon, width, height }) => (
                  <li key={label}>
                    <a href={href} aria-label={label} className={`grid size-10 place-items-center rounded-[6.8px] bg-[#faf7f5] transition-opacity lg:size-[43.892px] lg:opacity-70 hover:opacity-100 ${focusClasses}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- Original local Figma vector icon. */}
                      <img src={icon} alt="" width={width} height={height} className="max-lg:h-auto max-lg:w-[27.9px]" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <FooterNewsletter content={content.newsletter} />
        </div>

        <div className="flex items-end justify-between gap-5 text-[12px] leading-[1.25] lg:text-[calc(15*var(--footer-type-unit))]">
          <Link href={content.privacy.href} prefetch={false} className={focusClasses}>{content.privacy.label}</Link>
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
