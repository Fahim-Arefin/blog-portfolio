"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navigation } from "@/config/navigation";
import { NavLink } from "./nav-link";
import styles from "./site-header.module.css";

export function ContentsMenu() {
  const details = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const contentsActive = pathname === "/contents" || pathname.startsWith("/contents/");

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !details.current?.contains(event.target)) {
        details.current?.removeAttribute("open");
      }
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && details.current?.open) {
        details.current.open = false;
        details.current.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return (
    <details ref={details} className={styles.contents}>
      <summary
        className={styles.contentsTrigger}
        data-active={contentsActive ? "true" : undefined}
      >
        Contents
        {/* eslint-disable-next-line @next/next/no-img-element -- Original Figma SVG. */}
        <img src="/icons/chevron-down.svg" width={10.72} height={6.03} alt="" />
      </summary>
      <ul className={styles.dropdown}>
        {navigation.map(({ label, href }, index) => (
          <li key={href}>
            <NavLink href={href} prefetch={false} onClick={() => details.current?.removeAttribute("open")}>
              {index === 0 ? "All contents" : label}
            </NavLink>
          </li>
        ))}
      </ul>
    </details>
  );
}
