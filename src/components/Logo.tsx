import Image from "next/image";
import Link from "next/link";
import { STORE } from "@/data/store";

/**
 * Intrinsic size of public/logo-gold.png, used to derive width from height.
 * Keep it in step with the artwork — `node scripts/knockout-logo.mjs` prints
 * the trimmed dimensions, and a stale ratio here stretches the wordmark.
 */
const RATIO = 1211 / 832;

type Props = {
  /** Rendered height in px; width follows the artwork's aspect ratio. */
  height?: number;
  /** Set false inside dialogs, where a link out would be a trap. */
  link?: boolean;
};

/**
 * The client's logo.png is drawn for light backgrounds (solid black script).
 * `scripts/build-logo.mjs` turns it into the white-on-dark wordmark, and
 * `scripts/retint-logo.mjs` moves the accent from the old teal onto the brand
 * gold — public/logo-gold.png is that last step and is what ships.
 */
export default function Logo({ height = 78, link = true }: Props) {
  const img = (
    <Image
      src="/logo-gold.png"
      alt={`${STORE.fullName} logo`}
      width={Math.round(height * RATIO)}
      height={height}
      priority
    />
  );

  if (!link) return <span className="logo">{img}</span>;

  return (
    <Link href="/" className="logo" aria-label={`${STORE.fullName} — home`}>
      {img}
    </Link>
  );
}
