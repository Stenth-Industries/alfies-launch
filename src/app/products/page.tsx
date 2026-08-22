import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BROWSABLE_BRANDS } from "@/data/catalog";
import { SERIES, countProducts } from "@/data/products";
import { STORE, LEGAL } from "@/data/store";
import ProductThumb from "@/components/ProductThumb";
import { PhoneIcon, PinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Products",
  description: `Disposables, pods and e-liquids in stock at ${STORE.fullName} — Elfbar, Flavour Beast, STLTH, Vuse, VEEV, Oxbar and more.`,
};

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">Our Shelves</span>
          <h1>
            What&apos;s in <span className="accent">store</span>
          </h1>
          <p>
            Every brand we carry, at a glance. Flavours and stock rotate weekly —
            call ahead or drop in for today&apos;s full selection.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {BROWSABLE_BRANDS.map((b) => {
              const series = SERIES[b.slug];
              return (
                <Link className="p-card" key={b.slug} href={`/products/${b.slug}`}>
                  <div className="thumb">
                    {b.cover ? (
                      <Image
                        src={b.cover}
                        alt={`${b.name} product range`}
                        width={900}
                        height={600}
                      />
                    ) : (
                      <ProductThumb />
                    )}
                  </div>
                  <div className="body">
                    <h3>{b.name}</h3>
                    <p className="desc">{b.tagline}</p>
                    <div className="chips">
                      <span>
                        {series.length} {series.length === 1 ? "series" : "series"}
                      </span>
                      <span>{countProducts(b.slug)} flavours</span>
                    </div>
                    <div className="foot">
                      <span className="stock">In store</span>
                      <span className="link">View the lineup →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="section-foot">
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
        </div>
      </section>
    </>
  );
}
