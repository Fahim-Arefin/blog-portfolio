"use client";

import { useState, type FormEvent } from "react";
import type { FooterContent } from "@/lib/content/footer";

export function FooterNewsletter({ content }: { content: FooterContent["newsletter"] }) {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Connect the newsletter API here when it is available; never imply a subscription was saved.
    setStatus("Newsletter signup is coming soon.");
  }

  return (
    <section aria-labelledby="footer-newsletter-title" className="min-w-0">
      <h2 id="footer-newsletter-title" className="text-[17.25px] leading-[1.25] font-bold lg:text-[calc(23*var(--footer-type-unit))]">{content.heading}</h2>
      <p className="mt-1.5 text-[13.5px] leading-[1.25] lg:text-[calc(15*var(--footer-type-unit))]">{content.introduction}</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex min-h-[34px] items-center gap-4 border-b border-[#faf7f5] pb-[7px]">
          <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
          <input id="footer-newsletter-email" name="email" type="email" autoComplete="email" required placeholder={content.placeholder} aria-describedby="footer-newsletter-disclaimer" className="min-w-0 flex-1 bg-transparent text-[13.5px] leading-[1.25] text-[#faf7f5] outline-none placeholder:text-[#faf7f5] autofill:shadow-[inset_0_0_0_1000px_#0d1317] autofill:[-webkit-text-fill-color:#faf7f5] autofill:caret-[#faf7f5] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6d7df] lg:font-sangira lg:text-[calc(24*var(--footer-type-unit))] lg:leading-[1.1] lg:tracking-[.03em]" />
          <button type="submit" aria-label="Subscribe to the newsletter" className="group -my-2 -mr-2 grid size-10 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c6d7df]">
            {/* eslint-disable-next-line @next/next/no-img-element -- Original local Figma vector. */}
            <img src="/icons/footer/arrow-right.svg" alt="" width={24} height={15} className="motion-safe:group-hover:animate-arrow-return motion-safe:group-focus-visible:animate-arrow-return" />
          </button>
        </div>
        <p id="footer-newsletter-disclaimer" className="mt-1 text-[12px] leading-[1.25] lg:text-[max(11px,calc(12*var(--footer-type-unit)))]">{content.disclaimer}</p>
        <p role="status" className={status ? "mt-3 text-sm leading-normal" : "sr-only"}>{status}</p>
      </form>
    </section>
  );
}
