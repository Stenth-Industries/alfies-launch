"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductThumb from "@/components/ProductThumb";
import { CloseIcon, PhoneIcon } from "@/components/icons";
import type { Spec } from "@/data/specs";

/**
 * One flavour, flattened for the client. The server does the SERIES/RENDERS/
 * SPECS lookups so the browser only receives what it draws.
 */
export type FlavourCard = {
  name: string;
  badge?: string;
  note?: string;
  render?: string;
  /** Series the flavour belongs to, e.g. "BC10000". */
  seriesName: string;
  spec?: Spec;
};

type Props = {
  brandName: string;
  products: FlavourCard[];
  /** tel: href for the dialog's call-to-action. */
  phoneHref: string;
  phone: string;
};

/** Label/value rows in the order the spec sheet reads on the packaging. */
function specRows(brandName: string, spec?: Spec) {
  return [
    ["Brand", brandName.toUpperCase()],
    ["Type", spec?.type],
    ["Puffs", spec?.puffs],
    ["E-liquid", spec?.eLiquid],
    ["Nicotine", spec?.nicotine],
    ["Charging", spec?.charging],
  ].filter((r): r is [string, string] => Boolean(r[1]));
}

/**
 * The flavour grid on a brand page, where each card opens a detail dialog.
 *
 * Uses a native <dialog> with showModal() so focus trapping, Esc-to-close and
 * inerting the page behind come from the platform rather than from us.
 */
export default function FlavourGrid({
  brandName,
  products,
  phoneHref,
  phone,
}: Props) {
  const [open, setOpen] = useState<FlavourCard | null>(null);
  const ref = useRef<HTMLDialogElement>(null);

  /** State is the single source of truth; the effect below syncs the element. */
  const close = useCallback(() => setOpen(null), []);

  // Dismissing with Esc fires `cancel` but not always `close`, so listening for
  // `close` alone would strand `open` — the scroll lock would stay on and
  // re-clicking the same card would be a no-op. Take over `cancel` and let the
  // sync effect do the closing.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      setOpen(null);
    };
    const onClose = () => setOpen(null);
    el.addEventListener("cancel", onCancel);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("cancel", onCancel);
      el.removeEventListener("close", onClose);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // showModal() blocks interaction but Safari and Firefox still scroll the
  // page. A class is idempotent, so an unbalanced run can't strand the lock.
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("dialog-open");
    return () => document.documentElement.classList.remove("dialog-open");
  }, [open]);

  return (
    <>
      <div className="flavour-grid">
        {products.map((p) => (
          <button
            type="button"
            className="f-card"
            key={`${p.seriesName}-${p.name}`}
            onClick={() => setOpen(p)}
            aria-haspopup="dialog"
          >
            <ProductThumb
              src={p.render}
              alt={`${brandName} ${p.seriesName} — ${p.name}`}
            />
            <div className="body">
              <h3>
                {p.name}
                {p.badge && <span className="badge">{p.badge}</span>}
              </h3>
              {p.note && <p className="note">{p.note}</p>}
              <p className="meta">
                {brandName} · {p.seriesName}
              </p>
            </div>
          </button>
        ))}
      </div>

      <dialog
        className="p-dialog"
        ref={ref}
        aria-label={open ? `${open.name} details` : undefined}
        // The dialog element itself is the backdrop's hit area; the inner
        // wrapper stops the click so only outside clicks dismiss.
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        {open && (
          <div className="p-dialog-inner">
            <button
              type="button"
              className="p-dialog-close"
              onClick={close}
              aria-label="Close"
            >
              <CloseIcon />
            </button>

            <div className="p-dialog-media">
              <ProductThumb
                src={open.render}
                alt={`${brandName} ${open.seriesName} — ${open.name}`}
              />
            </div>

            <div className="p-dialog-body">
              <p className="p-dialog-eyebrow">
                {brandName} · {open.seriesName}
              </p>
              <h2 className="p-dialog-title">
                {open.name}
                {open.badge && <span className="badge">{open.badge}</span>}
              </h2>
              {open.note && <p className="p-dialog-note">{open.note}</p>}

              <dl className="spec-table">
                {specRows(brandName, open.spec).map(([label, value]) => (
                  <div className="spec-row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              {open.spec?.note && (
                <p className="p-dialog-fineprint">{open.spec.note}</p>
              )}

              <a href={phoneHref} className="btn btn-solid p-dialog-cta">
                <PhoneIcon />
                Call to check stock
              </a>
              <p className="p-dialog-fineprint">
                Stock rotates weekly — we don&apos;t sell online. Call {phone} or
                drop in.
              </p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
