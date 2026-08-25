"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { WallItem } from "@/data/home";

export type WallFilter = { slug: string; label: string; count: number };

/**
 * The flavour wall.
 *
 * This is the shop's defining object — the lit grid of devices behind the
 * counter — and the site's whole argument is that you should be able to walk
 * it from your phone. So it is the page's centrepiece rather than a section:
 * full-bleed, dense, and showing everything at once instead of a sample.
 *
 * Every tile is lit by the colour sampled from its own render (see
 * scripts/knockout-renders.mjs), which is where the page's colour comes from.
 * Nothing here is tinted by hand.
 */
export default function TheWall({
  items,
  filters,
}: {
  items: WallItem[];
  filters: WallFilter[];
}) {
  const [active, setActive] = useState("all");

  const shown = useMemo(
    () =>
      active === "all"
        ? items
        : items.filter((i) => i.profiles.includes(active)),
    [items, active],
  );

  return (
    <section className="wall" id="wall" aria-labelledby="wall-title">
      <div className="wall-head">
        <h2 id="wall-title">The wall</h2>
        <p>
          Every flavour we stock, in one place. Most people know what they like
          before they know which box it comes in — so start with the taste.
        </p>
      </div>

      <div className="wall-filters" role="tablist" aria-label="Flavour profiles">
        {filters.map((f) => (
          <button
            key={f.slug}
            type="button"
            role="tab"
            aria-selected={f.slug === active}
            aria-controls="wall-grid"
            className={`wall-chip${f.slug === active ? " is-active" : ""}`}
            onClick={() => setActive(f.slug)}
          >
            {f.label}
            <em>{f.count}</em>
          </button>
        ))}
      </div>

      <div className="wall-grid" id="wall-grid" role="tabpanel">
        {shown.map((item) => (
          <Link
            key={item.key}
            href={`/products/${item.brandSlug}`}
            className={`tile${item.scene ? " is-scene" : ""}`}
            style={
              item.glow
                ? ({ "--glow": item.glow } as React.CSSProperties)
                : undefined
            }
          >
            <span className="tile-lamp" aria-hidden="true" />
            <span className="tile-shot">
              <Image
                src={item.render}
                alt={`${item.brandName} ${item.seriesName} — ${item.flavour}`}
                width={480}
                height={480}
                sizes="(max-width: 560px) 44vw, (max-width: 1100px) 22vw, 14vw"
              />
            </span>
            <span className="tile-name">{item.flavour}</span>
            <span className="tile-brand">
              {item.brandName} · {item.seriesName}
            </span>
            {item.puffs ? <span className="tile-puffs">{item.puffs}</span> : null}
          </Link>
        ))}
      </div>

      <p className="wall-foot">
        Showing <b>{shown.length}</b> of {items.length}. Stock moves — call{" "}
        <Link href="/contact">the shop</Link> if you want something held.
      </p>
    </section>
  );
}
