import Link from "next/link";
import Logo from "./Logo";
import HealthWarning from "./HealthWarning";
import { STORE, LEGAL } from "@/data/store";
import { BRANDS } from "@/data/catalog";
import { InstagramIcon, FacebookIcon } from "./icons";

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
            <li><Link href="/privacy">Privacy</Link></li>
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
            {STORE.hours.map((h) => (
              <li key={h.days}>
                <span>{h.days}: {h.time}</span>
              </li>
            ))}
          </ul>
          <div className="footer-socials">
            <a href={STORE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={STORE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-warning">
        <div className="container">
          {LEGAL.ageNotice} {LEGAL.idNotice}
        </div>
      </div>

      {/* The prescribed warning restated in its required format. The block at
          the top of the page is the one s. 14 measures; this is a repeat. */}
      <div className="container">
        <HealthWarning variant="repeat" />
      </div>

      <div className="container footer-bottom">
        <span>© {year} {STORE.fullName}. All rights reserved.</span>
        <span>{LEGAL.disclaimer}</span>
      </div>
    </footer>
  );
}
