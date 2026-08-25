import Image from "next/image";
import Link from "next/link";
import { STORE } from "@/data/store";
import { PinIcon, PhoneIcon, BagIcon } from "@/components/icons";

/**
 * The landing hero, shared by the live home page and both design variants
 * (`/home1`, `/home2`) so the three stay pixel-identical above the fold and
 * only the sections underneath differ.
 *
 * The shot sits behind the copy at its natural scale — contained, not
 * cover-cropped — so the neon sign and the whole device lineup stay in frame.
 * Fitting is left to CSS (`.hero-bg img`) rather than an inline style so the
 * narrow-screen rules can restack it under the copy.
 */
export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <Image
          src="/hero.png"
          alt="The device lineup on the counter at Alfie's Vape Store, under the neon shop sign"
          width={1536}
          height={1024}
          sizes="(max-width: 960px) 100vw, 85vw"
          priority
        />
      </div>
      <div className="container hero-copy-col">
        <div className="hero-copy">
          <span className="hero-tag">
            <PinIcon />
            {STORE.city}, {STORE.province}
          </span>
          <h1>
            Your local <span className="accent">vape destination.</span>
          </h1>
          <p className="lede">
            A specialty vape store in {STORE.city}. Wide selection, staff who
            know the stock, and {STORE.minimumAge}+ with photo ID at the
            door.
          </p>
        </div>
      </div>
      {/* A sibling of the copy rather than a child of it, so the narrow-screen
          rules can `order` it below the photo — the buttons are the last thing
          you reach on a phone, after you have seen the shot. */}
      <div className="container hero-actions-col">
        <div className="hero-actions">
          <Link href="/products" className="btn btn-solid">
            <BagIcon />
            Explore Products
          </Link>
          <a href={STORE.phoneHref} className="btn btn-outline">
            <PhoneIcon />
            Call {STORE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
