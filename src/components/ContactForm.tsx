"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { STORE } from "@/data/store";

/**
 * There is no backend yet, so the form composes a mailto: draft addressed to
 * the shop — the visitor's own mail app does the sending. Swap this for a
 * form service (Formspree, Web3Forms, …) or an API route when one exists.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Website enquiry — ${data.get("topic")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone") || "—"}`,
      "",
      String(data.get("message")),
    ].join("\n");

    window.location.href = `mailto:${STORE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone (optional)</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-topic">What&apos;s it about?</label>
        <select id="cf-topic" name="topic" defaultValue="Product question">
          <option>Product question</option>
          <option>Stock / availability</option>
          <option>Price check</option>
          <option>Feedback</option>
          <option>Something else</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          required
          placeholder="Looking for a specific flavour? Ask away."
        />
      </div>

      <button type="submit" className="btn btn-solid">
        Send Message
      </button>

      <p className={`form-status${sent ? " show" : ""}`}>
        Your email app should open with the message ready to send. Prefer to
        talk? Call us at {STORE.phone}.
      </p>
      <p className="form-note">
        We usually reply within one business day. For anything urgent, calling
        the shop is fastest. Nothing you type here is sent to us until you press
        send in your own email app — see our{" "}
        <Link href="/privacy">privacy notice</Link>.
      </p>
    </form>
  );
}
