"use client";

import Link from "next/link";
import { useState } from "react";
import ProductThumb from "@/components/ProductThumb";
import type { ShelfItem } from "@/data/home";

/** Serialisable slice of a FlavourProfileView — the RegExp stays on the server. */
export type ProfileTab = {
  slug: string;
  label: string;
  blurb: string;
  count: number;
  items: ShelfItem[];
};

/**
 * "Shop by flavour profile" — the pattern every competitor uses to give the
 * catalogue more than one front door. Filtering happens in the browser against
 * the flavours already in the payload, so there is no extra route to maintain.
 */
export default function FlavourExplorer({
  profiles,
  perTab = 8,
}: {
  profiles: ProfileTab[];
  perTab?: number;
}) {
  const [active, setActive] = useState(profiles[0]?.slug ?? "");
  const current = profiles.find((p) => p.slug === active) ?? profiles[0];
  if (!current) return null;

  // Renders first — a wall of "photo coming soon" placeholders reads as empty.
  const shown = [...current.items]
    .sort((a, b) => Number(Boolean(b.render)) - Number(Boolean(a.render)))
    .slice(0, perTab);

  return (
    <div className="fx">
      <div className="fx-select-wrap">
        <select
          className="fx-select"
          aria-label="Flavour profile"
          value={current.slug}
          onChange={(e) => setActive(e.target.value)}
        >
          {profiles.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.label} ({p.count})
            </option>
          ))}
        </select>
      </div>

      <p className="fx-blurb">{current.blurb}</p>

      <div className="flavour-grid">
        {shown.map((item) => (
          <Link
            className="f-card"
            key={item.key}
            href={`/products/${item.brandSlug}`}
          >
            <ProductThumb
              src={item.render}
              alt={`${item.brandName} ${item.seriesName} — ${item.flavour}`}
            />
            <div className="body">
              <h3>
                {item.flavour}
                {item.badge ? <span className="badge">{item.badge}</span> : null}
              </h3>
              <p className="note">
                {item.brandName} · {item.seriesName}
              </p>
              <div className="meta">{item.puffs ?? "Pod system"}</div>
            </div>
          </Link>
        ))}
      </div>

      {current.count > shown.length ? (
        /* No "showing N of M" — the narrow-screen rules trim the grid to two
           rows in CSS, so any count stated here would be wrong on a phone. */
        <p className="fx-more">
          {current.count} {current.label.toLowerCase()} flavours in store.{" "}
          <Link href="/products">See the full wall →</Link>
        </p>
      ) : null}
    </div>
  );
}
