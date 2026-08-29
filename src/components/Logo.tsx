import Image from "next/image";
import Link from "next/link";
import { STORE } from "@/data/store";

/**
 * Intrinsic size of public/logo-gold.png, used to derive width from height.
 * Keep it in step with the artwork — `node scripts/prepare-logo.mjs` prints
 * the trimmed dimensions, and a stale ratio here stretches the emblem.
 */
const RATIO = 1508 / 1010;

type Props = {
  /** Rendered height in px; width follows the artwork's aspect ratio. */
  height?: number;
  /** Set false inside dialogs, where a link out would be a trap. */
  link?: boolean;
};

/**
 * The client's current artwork is the gold emblem at root logo-emblem.png,
 * supplied finished — gold on transparency, no recolour needed.
 * `scripts/prepare-logo.mjs` only trims its surround into public/logo-gold.png,
 * which is what ships. The build-logo / retint-logo / knockout-logo scripts
 * belong to the superseded teal wordmark and are not in this path any more.
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
