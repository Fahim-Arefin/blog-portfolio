"use client";

import { useEffect, useState } from "react";
import { searchablePages } from "@/config/navigation";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "./nav-link";
import styles from "./site-header.module.css";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div className={styles.mobileNavigation}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button type="button" className={styles.menuTrigger} aria-label="Open navigation menu">
            <span className={styles.hamburger} aria-hidden="true"><span /><span /><span /></span>
          </button>
        </SheetTrigger>
        <SheetContent>
          <div className={styles.sheetHeading}>
            <SheetTitle className={styles.sheetTitle}>Explore</SheetTitle>
            <SheetClose asChild>
              <button type="button" className={styles.sheetClose} aria-label="Close navigation menu">
                <span aria-hidden="true" />
              </button>
            </SheetClose>
          </div>
          <SheetDescription className={styles.sheetDescription}>Discover Nabil&apos;s work and get in touch.</SheetDescription>
          <nav aria-label="Mobile navigation">
            <ul className={styles.sheetLinks}>
              {searchablePages.map(({ label, href }) => (
                <li key={href}>
                  <NavLink href={href} prefetch={false} onClick={() => setOpen(false)}>{label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
