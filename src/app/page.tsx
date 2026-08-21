import Image from "next/image";
import Link from "next/link";
import { STORE } from "@/data/store";
import { BRANDS, PRODUCT_BRANDS } from "@/data/catalog";
import {
  PinIcon,
  PhoneIcon,
  BagIcon,
  ShieldIcon,
  ChatIcon,
  StoreIcon,
  ClockIcon,
  MailIcon,
} from "@/components/icons";

export default function HomePage() {
  const featured = PRODUCT_BRANDS.slice(0, 3);
  // The wordmark strip doubles its content so the marquee can loop seamlessly.
  const marquee = [...BRANDS, ...BRANDS];

  return (
    <>
      {/* ---------- hero ---------- */}
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
              Quality products. Great selection. Friendly service.
              That&apos;s the <strong>Alfie&apos;s</strong> way.
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

      {/* ---------- trust row ---------- */}
      <section className="trust">
        <div className="container">
          <div className="trust-item">
            <span className="ico"><ShieldIcon /></span>
            <div>
              <h3>100% Authentic</h3>
              <p>Every device and pod sourced from authorized Canadian distributors.</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="ico"><ChatIcon /></span>
            <div>
              <h3>Honest Advice</h3>
              <p>New to vaping or chasing a flavour? We&apos;ll point you the right way.</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="ico"><StoreIcon /></span>
            <div>
              <h3>Local &amp; Independent</h3>
              <p>Proudly serving {STORE.city} — drop in, browse the wall, say hi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- featured brands ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Featured Brands</span>
            <h2>
              The names you <span className="accent">know &amp; trust</span>
            </h2>
            <p>
              We stock the most popular vape brands in Canada — all under one roof.
            </p>
          </div>
        </div>
        <div className="brand-marquee">
          <div className="brand-track">
            {marquee.map((b, i) => (
              <Link href="/products" className="brand-chip" key={`${b.slug}-${i}`} aria-label={b.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.logo} alt={`${b.name} logo`} loading="lazy" />
              </Link>
            ))}
          </div>
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
