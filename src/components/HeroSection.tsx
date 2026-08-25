import Image from "next/image";
import Link from "next/link";
import { STORE } from "@/data/store";
import { PinIcon, PhoneIcon, BagIcon } from "@/components/icons";
import OpenNow from "@/components/OpenNow";
import { WALL } from "@/data/home";

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
      <div className="container">
        <div className="hero-copy">
          <span className="hero-tag">
            <PinIcon />
            {STORE.city}, {STORE.province}
          </span>
          <h1>
            Know the taste.
            <br />
            <em>Find the box after.</em>
          </h1>
          <p className="lede">
            Every flavour {STORE.name} stocks, on one wall — {WALL.length} of
            them — so you can start from what you actually like.
          </p>
          <div className="hero-actions">
            <Link href="/#wall" className="btn btn-solid">
              <BagIcon />
              Walk the wall
            </Link>
            <a href={STORE.phoneHref} className="btn btn-outline">
              <PhoneIcon />
              Call {STORE.phone}
            </a>
          </div>
          <OpenNow className="hero-state" />
        </div>
      </div>
    </section>
  );
}
