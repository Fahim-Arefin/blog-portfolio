import { NavLink } from "./nav-link";
import { navigation } from "@/config/navigation";
import { ContentsMenu } from "./contents-menu";
import { SiteSearch } from "./site-search";
import { MobileNavigation } from "./mobile-navigation";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav aria-label="Primary navigation" className={styles.navigation}>
          <ContentsMenu />
          <NavLink className={`${styles.link} ${styles.testimonials}`} href={navigation[1].href} prefetch={false}>Testimonials</NavLink>
          <NavLink href="/" aria-label="Nabil Hossain — Home" className={styles.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Original vector wordmark, served locally. */}
            <img src="/images/brand/nabil-logo.svg" width={78.62} height={30} alt="Nabil Hossain" />
          </NavLink>
          <NavLink className={`${styles.link} ${styles.assistance}`} href={navigation[2].href} prefetch={false}>Get my Assistance</NavLink>
          <NavLink className={`${styles.link} ${styles.contact}`} href={navigation[3].href} prefetch={false}>Get In Touch</NavLink>
        </nav>
        <SiteSearch />
        <MobileNavigation />
      </div>
    </header>
  );
}
