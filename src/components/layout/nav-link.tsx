"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import styles from "./site-header.module.css";

export function NavLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const href = typeof props.href === "string" ? props.href : props.href.pathname;
  const active = pathname === href ||
    (href !== "/" && typeof href === "string" && pathname.startsWith(`${href}/`));

  return <Link {...props} className={`${styles.activeLink} ${props.className ?? ""}`} aria-current={active ? "page" : undefined} />;
}
