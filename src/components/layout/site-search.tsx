"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { searchablePages } from "@/config/navigation";
import styles from "./site-header.module.css";

export function SiteSearch() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const results = searchablePages.filter(({ label }) =>
    label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <button
        type="button"
        className={styles.searchButton}
        aria-label="Search pages"
        aria-haspopup="dialog"
        onClick={() => { setQuery(""); dialog.current?.showModal(); }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Original Figma SVG. */}
        <img src="/icons/search.svg" width={17.5067} height={17.5067} alt="" />
      </button>
      <dialog
        ref={dialog}
        className={styles.searchDialog}
        aria-labelledby="site-search-title"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            dialog.current?.close();
          }
        }}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        <div className={styles.searchPanel}>
          <div className={styles.searchHeading}>
            <h2 id="site-search-title">Search pages</h2>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close search">Close</button>
          </div>
          <label className={styles.searchLabel} htmlFor="site-search-input">Find a page</label>
          <input
            id="site-search-input"
            type="search"
            placeholder="What are you looking for?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
          />
          <p className={styles.resultCount} role="status">{results.length} {results.length === 1 ? "page" : "pages"} found</p>
          <ul className={styles.searchResults}>
            {results.map(({ label, href }) => (
              <li key={href}><Link href={href} prefetch={false} onClick={() => dialog.current?.close()}>{label}</Link></li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
