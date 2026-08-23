import Image from "next/image";
import Link from "next/link";
import { STORE } from "@/data/store";
import { PinIcon, PhoneIcon, BagIcon } from "@/components/icons";

/**
 * The landing hero, shared by the live home page and both design variants
 * (`/home1`, `/home2`) so the three stay pixel-identical above the fold and
 * only the sections underneath differ.
 */
export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <Image
          src="/hero.png"
          alt="A lineup of vape devices on the counter at Alfie's Vape Store"
          fill
          sizes="(max-width: 960px) 100vw, 58vw"
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
            Your local <span className="accent">vape store.</span>
          </h1>
          <p className="lede">
            Quality products. Great selection. Friendly service. That&apos;s the{" "}
            <strong>Alfie&apos;s</strong> way.
          </p>
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
      </div>
    </section>
  );
}
