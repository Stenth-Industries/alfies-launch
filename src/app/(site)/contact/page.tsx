import type { Metadata } from "next";
import { STORE } from "@/data/store";
import { PinMark, PhoneMark } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Visit ${STORE.fullName} in ${STORE.city}, ${STORE.province} — address, hours, phone and directions.`,
};

const MAP_QUERY = encodeURIComponent(
  `${STORE.address}, ${STORE.city}, ${STORE.province} ${STORE.postalCode}`,
);

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">Contact Us</span>
          <h1>
            Drop in or <span className="accent">reach out</span>
          </h1>
          <p>
            Questions about stock, flavours or devices? Give us a call, or
            just come by — we&apos;re in the heart of {STORE.city}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* ---------- info column ---------- */}
          <div className="visit-info">
            <div className="info-row">
              <span className="ico"><PinMark /></span>
              <div>
                <h4>Address</h4>
                <div className="val">
                  {STORE.address}
                  <small>
                    {STORE.city}, {STORE.provinceShort} {STORE.postalCode}
                  </small>
                </div>
              </div>
            </div>

            <div className="info-row">
              <span className="ico"><PhoneMark /></span>
              <div>
                <h4>Phone</h4>
                <div className="val">
                  <a href={STORE.phoneHref}>{STORE.phone}</a>
                  <small>Fastest way to check stock</small>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- hours column ---------- */}
          <div className="contact-panel">
            <h2>Store Hours</h2>
            <p>Holiday hours may differ — check our socials.</p>
            <table className="hours-table">
              <tbody>
                {STORE.hours.map((h) => (
                  <tr key={h.days}>
                    <td>{h.days}</td>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------- map ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Find Us</span>
            <h2>
              In the heart of <span className="accent">{STORE.city}</span>
            </h2>
          </div>
          <div className="map-wrap">
            <iframe
              title={`Map to ${STORE.fullName}`}
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
