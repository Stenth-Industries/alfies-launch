import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FlavourExplorer, { type ProfileTab } from "@/components/FlavourExplorer";
import ProductThumb from "@/components/ProductThumb";
import { STORE } from "@/data/store";
import { FLAVOUR_PROFILES, arrivalPicks } from "@/data/home";
import { BRANDS, BROWSABLE_BRANDS, PRODUCT_BRANDS } from "@/data/catalog";
import {
  PinIcon,
  PhoneIcon,
  BagIcon,
  StoreIcon,
  RosetteIcon,
  ChatIcon,
  HeartIcon,
  ClockIcon,
  MailIcon,
} from "@/components/icons";

/**
 * arrivalPicks() reshuffles on a day boundary, so the static render has to be
 * allowed to go stale — without this it would serve whichever day it was built
 * on until the next deploy.
 */
export const revalidate = 86_400;

export default function HomePage() {
  const featured = PRODUCT_BRANDS.slice(0, 3);
  const arrivals = arrivalPicks(3);
  // The RegExp on each profile cannot cross into a client component.
  const tabs: ProfileTab[] = FLAVOUR_PROFILES.map(
    ({ slug, label, blurb, count, items }) => ({
      slug,
      label,
      blurb,
      count,
      items,
    }),
  );

  return (
    <>
      <HeroSection />

      {/* ---------- trust row ---------- */}
      <section className="trust">
        <div className="container">
          <div className="trust-item">
            <span className="ico"><StoreIcon /></span>
            <div>
              <h3>Local to {STORE.city}</h3>
              <p>Proudly serving our community.</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="ico"><RosetteIcon /></span>
            <div>
              <h3>Quality Products</h3>
              <p>Top brands and trusted products.</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="ico"><ChatIcon /></span>
            <div>
              <h3>Honest Advice</h3>
              <p>Straight answers about what we stock.</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="ico"><HeartIcon /></span>
            <div>
              <h3>Friendly Service</h3>
              <p>We&apos;re here to help you find what you need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- new arrivals ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">New Arrivals</span>
            <h2>
              Fresh on <span className="accent">the wall</span>
            </h2>
            <p>
              A few of the newer faces in the shop. The wall turns over weekly —
              call ahead if you want one held.
            </p>
          </div>

          <div className="card-grid">
            {arrivals.map((a) => (
              <Link
                href={`/products/${a.brandSlug}`}
                className="p-card"
                key={a.key}
              >
                <div className="thumb">
                  <ProductThumb
                    src={a.render}
                    alt={`${a.brandName} ${a.seriesName} — ${a.flavour}`}
                  />
                </div>
                <div className="body">
                  <h3>{a.flavour}</h3>
                  <p className="desc">
                    {a.brandName} · {a.seriesName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- featured brands ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head is-left">
            <span className="kicker">Featured Brands</span>
            <h2>
              The brands
              <br />
              <span className="accent">we carry</span>
            </h2>
            <p>
              We stock the most popular vape brands in Canada — all under one
              roof, with the full lineup listed for {BROWSABLE_BRANDS.length} of
              them.
            </p>
          </div>

          {/* Wrapper so the narrow-screen rules can clamp the wall to three
              rows and fade the cut out under the "view all" button. */}
          <div className="brand-reveal">
            <div className="brand-grid">
              {BRANDS.map((b) => {
                const browsable = BROWSABLE_BRANDS.some(
                  (x) => x.slug === b.slug,
                );
                return (
                  <Link
                    href={browsable ? `/products/${b.slug}` : "/products"}
                    className="brand-chip"
                    key={b.slug}
                    aria-label={b.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.logo} alt={`${b.name} logo`} loading="lazy" />
                  </Link>
                );
              })}
            </div>

            <div className="section-foot">
              <Link href="/products" className="btn btn-outline">
                View All Brands
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- shop by taste ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Shop by taste</span>
            <h2>
              Find your <span className="accent">flavour</span>
            </h2>
            <p>
              Most people know what they like before they know which box it
              comes in. Start there.
            </p>
          </div>

          <FlavourExplorer profiles={tabs} perTab={8} />
        </div>
      </section>

      {/* ---------- featured products ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head is-left">
            <span className="kicker">In Store Now</span>
            <h2>
              On the <span className="accent">shelf</span>
            </h2>
            <p>Part of what we are carrying this week.</p>
          </div>

          <div className="card-grid">
            {featured.map((b) => (
              /* The card is the link now. It used to be an <article> whose
                 only affordance was the "View range" anchor inside it, so
                 removing that without promoting the card would have left the
                 whole tile unclickable and unreachable by keyboard. */
              <Link href="/products" className="p-card" key={b.slug}>
                <div className="thumb">
                  <Image
                    src={b.cover}
                    alt={`${b.name} product range`}
                    width={900}
                    height={600}
                  />
                </div>
                <div className="body">
                  <h3>{b.name}</h3>
                  <p className="desc">{b.tagline}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="section-foot">
            <Link href="/products" className="btn btn-solid">
              <BagIcon />
              See All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- visit us ---------- */}
      <section className="section section-alt visit">
        <div className="container">
          <div>
            <h2>
              Come say hi<span className="accent">.</span>
            </h2>
            <p>
              Stock rotates weekly, so the wall in the shop is always ahead of
              the wall on this page. Come in and we will tell you what is
              actually in today, and what it costs.
            </p>
            <Link href="/contact" className="btn btn-outline">
              Get Directions
            </Link>
          </div>

          <div className="visit-info">
            <div className="info-row">
              <span className="ico"><PinIcon /></span>
              <div>
                <h4>Address</h4>
                <div className="val">
                  {STORE.address}, {STORE.city}, {STORE.provinceShort} {STORE.postalCode}
                </div>
              </div>
            </div>
            <div className="info-row">
              <span className="ico"><ClockIcon /></span>
              <div>
                <h4>Hours</h4>
                <div className="val">
                  {STORE.hours.map((h) => (
                    <small key={h.days}>
                      {h.days}: {h.time}
                    </small>
                  ))}
                </div>
              </div>
            </div>
            <div className="info-row">
              <span className="ico"><PhoneIcon /></span>
              <div>
                <h4>Phone</h4>
                <div className="val">
                  <a href={STORE.phoneHref}>{STORE.phone}</a>
                </div>
              </div>
            </div>
            <div className="info-row">
              <span className="ico"><MailIcon /></span>
              <div>
                <h4>Email</h4>
                <div className="val">
                  <a href={`mailto:${STORE.email}`}>{STORE.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
