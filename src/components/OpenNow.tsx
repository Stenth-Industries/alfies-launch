"use client";

import { useEffect, useState } from "react";
import { WEEK } from "@/data/home";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** 1290 → "9:30 PM". Whole hours drop the ":00". */
function clock(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0
    ? `${h} ${suffix}`
    : `${h}:${String(m).padStart(2, "0")} ${suffix}`;
}

type State = { open: boolean; detail: string };

function readState(now: Date): State | null {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  const today = WEEK[day];
  if (today && minutes >= today.open && minutes < today.close) {
    return { open: true, detail: `until ${clock(today.close)}` };
  }
  if (today && minutes < today.open) {
    return { open: false, detail: `opens ${clock(today.open)}` };
  }

  // Shut for the day — walk forward to the next day that has hours at all.
  for (let step = 1; step <= 7; step++) {
    const next = WEEK[(day + step) % 7];
    if (!next) continue;
    const name = step === 1 ? "tomorrow" : DAY_NAMES[(day + step) % 7];
    return { open: false, detail: `opens ${name} ${clock(next.open)}` };
  }
  return null;
}

/**
 * Live open/closed state for the shop.
 *
 * Deliberately renders nothing on the server: the answer depends on the
 * viewer's clock, and a server-rendered guess would either hydrate-mismatch or
 * quietly show the wrong thing to someone in another timezone. The badge
 * appearing a beat after load is the honest behaviour.
 */
export default function OpenNow({ className = "" }: { className?: string }) {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    const tick = () => setState(readState(new Date()));
    tick();
    // A minute is plenty — this flips at most twice a day.
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!state) return null;

  return (
    <span
      className={`open-now${state.open ? " is-open" : ""} ${className}`.trim()}
    >
      <i aria-hidden="true" />
      <b>{state.open ? "Open now" : "Closed"}</b>
      <span>{state.detail}</span>
    </span>
  );
}
