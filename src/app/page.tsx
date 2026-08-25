import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import FlavourExplorer, { type ProfileTab } from "@/components/FlavourExplorer";
import { STORE } from "@/data/store";
import { FLAVOUR_PROFILES } from "@/data/home";
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

export default function HomePage() {
  const featured = PRODUCT_BRANDS.slice(0, 3);
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
              <p>Real recommendations from real people.</p>
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

      {/* ---------- featured brands ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Featured Brands</span>
            <h2>
              The names you <span className="accent">know &amp; trust</span>
            </h2>
            <p>
              We stock the most popular vape brands in Canada — all under one
              roof, with the full lineup listed for {BROWSABLE_BRANDS.length} of
              them.
            </p>
          </div>

          <div className="brand-grid">
            {BRANDS.map((b) => {
              const browsable = BROWSABLE_BRANDS.some((x) => x.slug === b.slug);
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
          <div className="section-head">
            <span className="kicker">In Store Now</span>
            <h2>
              Fan <span className="accent">favourites</span>
            </h2>
            <p>A taste of what&apos;s on the shelf this week.</p>
          </div>

          <div className="card-grid">
            {featured.map((b) => (
              <article className="p-card" key={b.slug}>
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
                  <div className="foot">
                    <span className="stock">In store</span>
                    <Link href="/products" className="link">View range →</Link>
                  </div>
                </div>
              </article>
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
              The best way to find your next favourite is in person. Browse the
              flavour wall, try before you buy where we can, and get honest
              recommendations from people who actually vape.
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
