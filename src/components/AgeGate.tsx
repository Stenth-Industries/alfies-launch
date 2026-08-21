"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { STORE, LEGAL } from "@/data/store";

const KEY = "alfies-age-verified";

/**
 * 19+ gate shown once per browser. Ontario requires vaping retailers to keep
 * minors out; the choice is stored in localStorage so returning visitors are
 * not asked again.
 */
export default function AgeGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) !== "yes") setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const confirm = () => {
    try {
      localStorage.setItem(KEY, "yes");
    } catch {
      /* private browsing — gate simply reappears next visit */
    }
    setShow(false);
  };

  const deny = () => {
    window.location.href = "https://www.canada.ca/en/health-canada/services/smoking-tobacco/vaping.html";
  };

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <div className="age-card">
        <Logo height={92} link={false} />
        <h2 id="age-gate-title">Are you {STORE.minimumAge} or older?</h2>
        <p>{LEGAL.ageNotice}</p>
        <div className="age-actions">
          <button className="btn btn-solid" onClick={confirm}>
            Yes, I&apos;m {STORE.minimumAge}+
          </button>
          <button className="btn btn-outline" onClick={deny}>
            No, exit
          </button>
        </div>
        <p className="fine">{LEGAL.warning}</p>
      </div>
    </div>
  );
}
