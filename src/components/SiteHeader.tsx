"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { STORE } from "@/data/store";
import { PhoneIcon } from "./icons";

const NAV = [
  { href: "/", label: "Home" },
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
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
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
