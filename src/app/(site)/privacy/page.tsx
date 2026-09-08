import type { Metadata } from "next";
import { STORE, LEGAL } from "@/data/store";
import { AGE_COOKIE } from "@/lib/age-gate";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${STORE.fullName} handles personal information.`,
};

/**
 * PIPEDA applies to any commercial site that collects personal information,
 * and the age gate collects a date of birth even though it does not keep one.
 * This page says what actually happens — it is written against the build, so
 * if the site starts using analytics, a pixel, a form backend or an ID-check
 * provider, this page changes in the same commit.
 */
export default function PrivacyPage() {
  const updated = "August 2026";

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">Privacy</span>
          <h1>
            What we do with <span className="accent">your information</span>
          </h1>
          <p>
            Short version: this website does not collect or store personal
            information about you. Last updated {updated}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Who we are</h2>
          <p>
            {STORE.fullName}, {STORE.address}, {STORE.city},{" "}
            {STORE.provinceShort} {STORE.postalCode}. Questions about privacy
            can go to <a href={STORE.phoneHref}>{STORE.phone}</a>, or come
            by the shop.
          </p>

          <h2>The age check</h2>
          <p>
            The law requires us to take reasonable steps to keep vaping product
            information away from anyone under {STORE.minimumAge}. To do that we
            ask for your date of birth before showing you the site.
          </p>
          <p>
            We use that date once, on our server, to work out whether you are{" "}
            {STORE.minimumAge} or older, and then we discard it. It is not
            written to a database, a log or a file, and it never leaves the
            request that carried it. What we keep instead is a single cookie
            named <code>{AGE_COOKIE}</code> holding nothing but a yes. It lasts
            about a month, it cannot be read by scripts, and clearing your
            cookies removes it.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            The age cookie above is the only cookie this site sets. There is no
            analytics, no advertising pixel, no session recording and no
            third-party tracker on any page. If that ever changes we will ask
            for your consent before it does, and say so here.
          </p>

          <h2>Contacting us</h2>
          <p>
            This site has no contact form, so there is nothing here that
            collects what you type. If you email or call the shop, your message
            reaches us the same way any email or phone call would, and we keep
            it only as long as we need it to answer you.
          </p>

          <h2>What we do not do</h2>
          <p>
            We do not sell online, so we do not take payment details. We do not
            sell, rent or trade personal information. We do not send marketing
            email or texts from this site.
          </p>

          <h2>Your rights</h2>
          <p>
            Under Canada&apos;s Personal Information Protection and Electronic
            Documents Act you may ask what personal information we hold about
            you, ask us to correct it, and complain to the Office of the Privacy
            Commissioner of Canada if you are not satisfied with our answer.
            Write to us at the address above and we will respond.
          </p>

          <h2>In the shop</h2>
          <p>{LEGAL.ageNotice} {LEGAL.idNotice} We check ID by looking at it —
            we do not photograph, scan or record it.</p>
        </div>
      </section>
    </>
  );
}
