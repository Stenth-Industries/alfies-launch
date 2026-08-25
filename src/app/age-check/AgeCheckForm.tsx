"use client";

import { useActionState } from "react";
import { verifyAge, type AgeCheckState } from "./actions";
import { STORE, LEGAL } from "@/data/store";

const HEALTH_CANADA_VAPING =
  "https://www.canada.ca/en/health-canada/services/smoking-tobacco/vaping.html";

export default function AgeCheckForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<AgeCheckState, FormData>(
    verifyAge,
    {},
  );

  return (
    <form className="age-form" action={action}>
      <input type="hidden" name="next" value={next} />

      <fieldset className="dob">
        <legend>Date of birth</legend>
        <div className="dob-row">
          <label>
            <span>Day</span>
            <input
              name="day"
              inputMode="numeric"
              autoComplete="bday-day"
              maxLength={2}
              placeholder="DD"
              required
            />
          </label>
          <label>
            <span>Month</span>
            <input
              name="month"
              inputMode="numeric"
              autoComplete="bday-month"
              maxLength={2}
              placeholder="MM"
              required
            />
          </label>
          <label>
            <span>Year</span>
            <input
              name="year"
              inputMode="numeric"
              autoComplete="bday-year"
              maxLength={4}
              placeholder="YYYY"
              required
            />
          </label>
        </div>
      </fieldset>

      {state.error ? (
        <p className="age-error" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="age-actions">
        <button className="btn btn-solid" type="submit" disabled={pending}>
          {pending ? "Checking…" : "Enter"}
        </button>
        <a className="btn btn-outline" href={HEALTH_CANADA_VAPING}>
          Leave
        </a>
      </div>

      <p className="fine">
        {LEGAL.ageNotice} {LEGAL.idNotice} We use your date of birth once, to
        work out whether you are {STORE.minimumAge}. It is not stored.
      </p>
    </form>
  );
}
