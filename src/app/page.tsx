import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import TheWall from "@/components/TheWall";
import OpenNow from "@/components/OpenNow";
import { STORE } from "@/data/store";
import { WALL, WALL_FILTERS } from "@/data/home";
import { BRANDS, BROWSABLE_BRANDS } from "@/data/catalog";
import { PinIcon, PhoneIcon, MailIcon } from "@/components/icons";

/**
 * Four sections, with a deliberate rhythm: the hero is wide and quiet, the
 * wall is loud and full-bleed, the brand rail is almost a footnote, and the
 * visit block is calm again. The old page ran six sections of the same shape —
 * kicker, centred headline, centred blurb, grid, centred button — which gave
 * everything the same weight and left nothing to remember.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />

      <TheWall items={WALL} filters={WALL_FILTERS} />

      {/* Brands are how suppliers organise the world, not how customers shop —
          so they get a quiet rail under the wall rather than a section. */}
      <section className="rail" aria-labelledby="rail-title">
        <div className="container rail-inner">
          <h2 id="rail-title">
            Stocked here
            <span>
              {BROWSABLE_BRANDS.length} lineups listed in full
            </span>
          </h2>
          <ul className="rail-marks">
            {BRANDS.map((b) => {
              const browsable = BROWSABLE_BRANDS.some((x) => x.slug === b.slug);
              return (
                <li key={b.slug}>
                  <Link
                    href={browsable ? `/products/${b.slug}` : "/products"}
                    aria-label={b.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.logo} alt={`${b.name} logo`} loading="lazy" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="visit" aria-labelledby="visit-title">
        <div className="container visit-inner">
          <div className="visit-say">
            <h2 id="visit-title">Come say hi</h2>
            <p>
              The best way to find your next favourite is over the counter.
              Walk the wall, ask what is actually good, and get an answer from
              someone who vapes.
            </p>
            <OpenNow className="visit-state" />
            <Link href="/contact" className="btn btn-solid">
              Get directions
            </Link>
          </div>

          <dl className="visit-facts">
            <div>
              <dt>
                <PinIcon />
                Address
              </dt>
              <dd>
                {STORE.address}
                <br />
                {STORE.city}, {STORE.provinceShort} {STORE.postalCode}
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd className="hours">
                {STORE.hours.map((h) => (
                  <span key={h.days}>
                    <i>{h.days}</i>
                    <b>{h.time}</b>
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>
                <PhoneIcon />
                Phone
              </dt>
              <dd>
                <a href={STORE.phoneHref}>{STORE.phone}</a>
              </dd>
            </div>
            <div>
              <dt>
                <MailIcon />
                Email
              </dt>
              <dd>
                <a href={`mailto:${STORE.email}`}>{STORE.email}</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
