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
 * Three rules have been relaxed at the client's request and are NOT met by this
 * build. They are listed here rather than quietly dropped, because the words
 * being right is not the same as the block being compliant:
 *
 *   s. 14  the 20% first-screen area, traded for a fixed 40px bar.
 *   s. 19  the 60-70% share of the display area, which the 40px bar cannot hold.
 *   s. 21  black on white. The block is inverted to white on black with a white
 *          border, to sit inside the site's dark palette. The prescribed
 *          colours are the ones in the CSS comment on `.health-warning`.
 *
 * The wording, the bold first word, the sans-serif face and the Health Canada
 * attribution are all still as prescribed. Restoring any of the three is a
 * CSS-only change; see globals.css.
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
