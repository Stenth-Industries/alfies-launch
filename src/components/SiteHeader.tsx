"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { STORE } from "@/data/store";
import { PhoneIcon } from "./icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/#new-arrivals", label: "New Arrivals" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact Us" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <Logo height={54} />

        <nav className={`main-nav${open ? " open" : ""}`} aria-label="Main">
          {NAV.map((item) => {
            const hash = item.href.startsWith("/#") ? item.href.slice(1) : null;
            // Next's router intercepts a same-page `#hash` Link and updates
            // the URL without scrolling — a long-standing App Router gap. A
            // plain anchor sidesteps the router entirely, so the browser's
            // native (smooth, per the html rule) anchor scroll just works.
            // Off the home page, `next/link` is kept so the hash still
            // lands correctly once the new page has loaded.
            if (hash && pathname === "/") {
              return (
                <a key={item.href} href={hash} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "active" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-cta">
          <a className="btn btn-outline btn-sm" href={STORE.phoneHref}>
            <PhoneIcon />
            <span className="btn-label">{STORE.phone}</span>
          </a>
          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
