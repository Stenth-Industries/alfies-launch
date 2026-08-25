import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANDS } from "@/data/catalog";
import { SERIES, countProducts } from "@/data/products";
import { renderFor } from "@/data/renders";
import { specFor } from "@/data/specs";
import { STORE, LEGAL } from "@/data/store";
import FlavourGrid from "@/components/FlavourGrid";
import { PhoneIcon, PinIcon, ArrowLeftIcon } from "@/components/icons";

type Params = { params: Promise<{ slug: string }> };

/** Only brands with a transcribed lineup get a page. */
export function generateStaticParams() {
  return BRANDS.filter((b) => SERIES[b.slug]?.length).map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) return {};

  return {
    title: brand.name,
    description: `${brand.name} devices, pods and flavours in stock at ${STORE.fullName} in ${STORE.city}.`,
  };
}

export default async function BrandPage({ params }: Params) {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);
  const series = SERIES[slug];
  if (!brand || !series?.length) notFound();

  const total = countProducts(slug);

  return (
    <>
      <section className="page-hero brand-hero">
        <div className="container">
          <Link href="/products" className="back-link">
            <ArrowLeftIcon />
            All brands
          </Link>
          <div className="brand-hero-head">
            <span className="brand-hero-logo">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={220}
                height={110}
              />
            </span>
            <div>
              <h1>{brand.name}</h1>
              <p>{brand.tagline}</p>
              <div className="chips">
                <span>
                  {series.length} {series.length === 1 ? "series" : "series"}
                </span>
                <span>{total} flavours</span>
                {brand.highlights.slice(0, 2).map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {series.map((s, i) => (
        <section
          className={`section series ${i % 2 ? "section-alt" : ""}`}
          key={s.slug}
          id={s.slug}
        >
          <div className="container">
            <div className="series-head">
              <div>
                <h2>{s.name}</h2>
                {s.blurb && <p>{s.blurb}</p>}
              </div>
              <div className="chips">
                {s.puffs && <span>{s.puffs}</span>}
                {s.format && <span>{s.format}</span>}
              </div>
            </div>

            <FlavourGrid
              brandName={brand.name}
              phone={STORE.phone}
              phoneHref={STORE.phoneHref}
              products={s.products.map((p) => ({
                name: p.name,
                badge: p.badge,
                note: p.note,
                render: renderFor(slug, s.slug, p.name),
                seriesName: s.name,
                spec: specFor(slug, s.slug),
              }))}
            />
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container section-foot">
          <p style={{ color: "var(--muted)", marginBottom: 8 }}>
            Flavours and stock rotate weekly — call ahead to confirm what&apos;s on
            the shelf today.
          </p>
          <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: "0.9rem" }}>
            {LEGAL.disclaimer}
          </p>
          <a href={STORE.phoneHref} className="btn btn-solid">
            <PhoneIcon />
            Call {STORE.phone}
          </a>{" "}
          <Link href="/contact" className="btn btn-outline">
            <PinIcon />
            Visit the Shop
          </Link>
        </div>
      </section>
    </>
  );
}
