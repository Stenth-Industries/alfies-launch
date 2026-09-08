/** Small inline icon set so the site needs no icon library. */

/**
 * Shared attributes for the stroked marks. These draw as outlines rather than
 * solid glyphs, so their colour comes from `currentColor` on the wrapper.
 */
const stroked = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1Z" />
    </svg>
  );
}

export function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6h-2a4 4 0 0 0-8 0H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm-6-2a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 4 5v6c0 5.25 3.4 10.16 8 11 4.6-.84 8-5.75 8-11V5Zm-1.5 14-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4Z" />
    </svg>
  );
}

/* ---------- stroked marks ---------- */

/*
 * These are drawn as outlines and used where an icon stands on its own — the
 * trust row and the contact rows. The filled glyphs above stay for the small
 * in-button uses, where a 1.5px stroke at 16px goes weak against a bold label.
 */

/** A shop with a scalloped awning — the storefront, not a generic building. */
export function StorefrontIcon() {
  return (
    <svg {...stroked}>
      <path d="M3 9.5 4.8 4.5h14.4L21 9.5" />
      <path d="M21 9.5a1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 1-3 0" />
      <path d="M5.2 11v9.5h13.6V11" />
      <path d="M9.8 20.5v-5.2h4.4v5.2" />
    </svg>
  );
}

/** A checked seal on ribbon tails. */
export function SealIcon() {
  return (
    <svg {...stroked}>
      <circle cx="12" cy="9" r="5.6" />
      <path d="M9.6 9.1l1.7 1.7 3.3-3.4" />
      <path d="M8.4 13.7 6.9 21.4l5.1-2.5 5.1 2.5-1.5-7.7" />
    </svg>
  );
}

/** Two bubbles trading places — a conversation, not a single blob. */
export function ConversationIcon() {
  return (
    <svg {...stroked}>
      <rect x="2" y="3.2" width="12.4" height="8.6" rx="2.4" />
      <path d="M5.6 11.8v3.3l3.5-3.3" />
      <rect x="12.6" y="13" width="9.4" height="7" rx="2.2" />
      <path d="M19 20v2.4l-3.1-2.4" />
    </svg>
  );
}

/** Two cupped hands holding a heart. */
export function HandHeartIcon() {
  return (
    <svg {...stroked}>
      <path d="M12 11.4 7.4 7.3a2.8 2.8 0 0 1 3.8-3.8l.8.8.8-.8a2.8 2.8 0 0 1 3.8 3.8Z" />
      <path d="M12 21.3H9.3a4.7 4.7 0 0 1-4.7-4.7v-3.8a1.35 1.35 0 0 1 2.7 0v2.5" />
      <path d="M12 21.3h2.7a4.7 4.7 0 0 0 4.7-4.7v-3.8a1.35 1.35 0 0 0-2.7 0v2.5" />
    </svg>
  );
}

/** Address. A pin with a hollow centre rather than a solid teardrop. */
export function PinMark() {
  return (
    <svg {...stroked}>
      <path d="M12 21.5c4.4-4.6 6.6-8.2 6.6-10.9a6.6 6.6 0 1 0-13.2 0c0 2.7 2.2 6.3 6.6 10.9Z" />
      <circle cx="12" cy="10.6" r="2.5" />
    </svg>
  );
}

/** Opening hours. */
export function ClockMark() {
  return (
    <svg {...stroked}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.6 2.1" />
    </svg>
  );
}

/** A handset, not a mobile — the number rings the shop. */
export function PhoneMark() {
  return (
    <svg {...stroked}>
      <path d="M5.1 3.4h3.6a1.4 1.4 0 0 1 1.4 1.2l.4 2.7a1.4 1.4 0 0 1-.5 1.3L8.6 9.8a12.4 12.4 0 0 0 5.6 5.6l1.2-1.4a1.4 1.4 0 0 1 1.3-.5l2.7.4a1.4 1.4 0 0 1 1.2 1.4v3.6a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 3.1 5.6a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 15.6-5.1-6.1a1 1 0 0 0-1.5 0L10 16.5l-2-2.3a1 1 0 0 0-1.5 0L4 17.2V5h16ZM8.5 10.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z" />
    </svg>
  );
}

export function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20Z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07a6.68 6.68 0 0 1 2.23.41 4.7 4.7 0 0 1 2.7 2.7 6.68 6.68 0 0 1 .41 2.23c.06 1.26.07 1.65.07 4.85s0 3.6-.07 4.85a6.68 6.68 0 0 1-.41 2.23 4.7 4.7 0 0 1-2.7 2.7 6.68 6.68 0 0 1-2.23.41c-1.26.06-1.65.07-4.85.07s-3.6 0-4.85-.07a6.68 6.68 0 0 1-2.23-.41 4.7 4.7 0 0 1-2.7-2.7 6.68 6.68 0 0 1-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85a6.68 6.68 0 0 1 .41-2.23 4.7 4.7 0 0 1 2.7-2.7 6.68 6.68 0 0 1 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 4.68A5.12 5.12 0 1 0 17.12 12 5.12 5.12 0 0 0 12 6.88Zm0 8.44A3.32 3.32 0 1 1 15.32 12 3.32 3.32 0 0 1 12 15.32Zm5.32-9.76a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2Z" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89a15.4 15.4 0 0 1 2.24.2v2.46H15.2a1.45 1.45 0 0 0-1.63 1.57V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 1 0-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4Z" />
    </svg>
  );
}
