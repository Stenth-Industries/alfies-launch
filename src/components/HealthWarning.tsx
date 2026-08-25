import { HEALTH_WARNING } from "@/data/store";

/**
 * The prescribed health warning for a vaping advertisement.
 *
 * A retailer's own website listing brands and flavours is an advertisement —
 * Health Canada's guidance treats online stores as points of sale, and the
 * footer line saying we do not sell online does not exempt it. So every page
 * carries this block, and the VPPR prescribes it as a *typographic
 * specification* rather than a sentence: getting the words right but the format
 * wrong is still non-compliance.
 *
 *   s. 14     at least 20% of the surface visible at first sight, measured
 *             from the top edge down — hence `variant="primary"` at the very
 *             top of the page, above the header.
 *   s. 17(2)  rectangular border of uniform width equal to 3% of the shortest
 *             side of the display area.
 *   s. 19     the warning itself occupies 60–70% of that display area.
 *   s. 21     black on white, standard sans serif, not compressed, expanded or
 *             decorative, first word upper case and bold.
 *   s. 22     attributed to Health Canada.
 *   s. 24–30  in advertising delivered by telecommunication it appears at the
 *             beginning and must not be obscured.
 *
 * Deliberately black-on-white in both themes: the colour is fixed by s. 21, so
 * this block does not follow the site's dark palette. That is not a bug.
 */
export default function HealthWarning({
  variant = "primary",
}: {
  /** "primary" is the s. 14 block at the top; "repeat" restates it in the footer. */
  variant?: "primary" | "repeat";
}) {
  return (
    <aside
      className={`health-warning hw-${variant}`}
      role="note"
      aria-label="Health Canada warning"
    >
      <div className="hw-frame">
        <p className="hw-text">
          <span>
            <strong>{HEALTH_WARNING.lead}</strong> {HEALTH_WARNING.rest}
          </span>
        </p>
        <p className="hw-attribution">{HEALTH_WARNING.attribution}</p>
      </div>
    </aside>
  );
}
