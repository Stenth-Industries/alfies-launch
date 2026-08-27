import type { Metadata } from "next";
import Logo from "@/components/Logo";
import AgeCheckForm from "./AgeCheckForm";
import { STORE } from "@/data/store";

export const metadata: Metadata = {
  title: "Age check",
  description: `${STORE.fullName} is a specialty vape store in ${STORE.city}, ${STORE.province}. You must be ${STORE.minimumAge} or older to enter.`,
};

/**
 * The gate. Middleware rewrites every un-verified request to this page, so it
 * is what a first-time visitor, a crawler and anyone with JavaScript disabled
 * receives — for any URL on the site. It names no brand, shows no product and
 * carries no navigation into the catalogue, because all of that is exactly what
 * the visitor has not yet earned the right to see.
 */
export default async function AgeCheckPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="age-page">
      <div className="age-card">
        <Logo height={92} link={false} />
        <h1>Are you {STORE.minimumAge} or older?</h1>
        <p className="age-lede">
          {STORE.fullName} is a specialty vape store in {STORE.city},{" "}
          {STORE.province}. The law lets us show what we carry to adults only.
        </p>
        <AgeCheckForm next={next ?? "/"} />
      </div>
    </div>
  );
}
