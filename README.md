# Alfie's Vape Store

Three-page Next.js site for Alfie's Vape Store (Barrie, Ontario).
Pages: Home (`/`), Products (`/products`), Contact (`/contact`).

## Run it

```bash
npm install
npm run dev      # development — http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where things live

- `src/data/store.ts` — store name, phone, address, email, hours, legal text.
  **Placeholder phone/address are still in here — replace with Alfie's real
  details before launch.**
- `src/data/catalog.ts` — the brand cards (name, tagline, highlight chips).
  Add or edit brands here; a brand with a `cover` image gets a card on the
  Products page, logo-only brands appear in the home-page brand strip.
- `public/covers/` — product-card artwork (3:2). `public/brands/` — brand
  wordmarks (most are white-on-transparent, shown on dark chips).
- `public/logo-light.png` — the header/footer wordmark. **Generated, not
  hand-edited.** The client's `logo.png` is drawn for light backgrounds (solid
  black script), so `scripts/build-logo.mjs` inverts the neutral pixels to
  white and retints the teal to the brand teal. If the source logo is ever
  replaced, re-run it:

  ```bash
  npm install --no-save sharp
  node scripts/build-logo.mjs
  ```
- `src/app/globals.css` — all styling. Palette: `#00D1D1` teal, `#5CE566`
  green, `#FFFFFF`, `#0F0F10`.

## Before launch

1. Real phone number, street address and email in `src/data/store.ts`
   (the map on the contact page follows the address automatically).
2. Real Instagram/Facebook links in the same file.
3. The contact form currently opens the visitor's email app (`mailto:`).
   For real submissions hook it to Formspree/Web3Forms or an API route —
   see the note in `src/components/ContactForm.tsx`.
4. Confirm store hours.
