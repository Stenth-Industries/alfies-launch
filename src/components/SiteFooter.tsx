import Link from "next/link";
import Logo from "./Logo";
import { STORE, LEGAL } from "@/data/store";
import { BRANDS } from "@/data/catalog";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container top">
        <div>
          <Logo height={72} />
          <p className="about-txt">
            {STORE.city}&apos;s local vape shop. Quality products, honest
            advice and a flavour wall worth the trip.
          </p>
        </div>

        <div>
          <h4>Pages</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4>Brands</h4>
          <ul>
            {BRANDS.slice(0, 5).map((b) => (
              <li key={b.slug}>
                <Link href="/products">{b.name}</Link>
              </li>
            ))}
            <li><Link href="/products">View all →</Link></li>
          </ul>
        </div>

        <div>
          <h4>Visit Us</h4>
          <ul>
            <li>
              <span>
                {STORE.address}, {STORE.city}, {STORE.provinceShort} {STORE.postalCode}
              </span>
            </li>
            <li><a href={STORE.phoneHref}>{STORE.phone}</a></li>
            <li><a href={`mailto:${STORE.email}`}>{STORE.email}</a></li>
            {STORE.hours.map((h) => (
              <li key={h.days}>
                <span>{h.days}: {h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-warning">
        <div className="container">
          {LEGAL.warning} {LEGAL.ageNotice}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} {STORE.fullName}. All rights reserved.</span>
        <span>{LEGAL.disclaimer}</span>
      </div>
    </footer>
  );
}
