"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [expanded, setExpanded] = useState(false);
  /** Height of the grid's first row, measured; null until the effect runs. */
  const [rowHeight, setRowHeight] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // The grid is `auto-fill`, so how many cards make a row depends on the
  // viewport and cannot be known here — the collapsed height has to be
  // measured rather than counted. Grid items stretch to their row, so the
  // first card's height is the row's height.
  //
  // Collapsed shows row one whole plus PEEK of row two, so what is hidden
  // reads as "more of the same below" rather than as the end of the grid.
  // The fade sits over the peek, which is why the first row's own labels
  // stay at full contrast.
  const measure = useCallback(() => {
    const first = gridRef.current?.firstElementChild;
    if (first instanceof HTMLElement) setRowHeight(first.offsetHeight);
  }, []);

  /** How much of the second row shows through under the fade. */
  const PEEK = 88;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, [measure, active]);

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
          onChange={(e) => {
            setActive(e.target.value);
            // A new profile starts collapsed, or switching tabs while expanded
            // would drop the visitor into the middle of a different grid.
            setExpanded(false);
          }}
        >
          {profiles.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.label} ({p.count})
            </option>
          ))}
        </select>
      </div>

      <p className="fx-blurb">{current.blurb}</p>

      <div className="fx-reveal" data-expanded={expanded ? "" : undefined}>
        <div
          className="flavour-grid"
          ref={gridRef}
          // Collapsed to exactly one row until measured, then animated open.
          // `undefined` rather than "none" so the expanded grid has no cap at
          // all and can grow when a card wraps to a taller body.
          style={
            expanded || rowHeight === null
              ? undefined
              : { maxHeight: rowHeight + PEEK, overflow: "hidden" }
          }
        >
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

        {shown.length > 1 ? (
          <div className="fx-foot">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? "Show Less" : "View All"}
            </button>
          </div>
        ) : null}
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
