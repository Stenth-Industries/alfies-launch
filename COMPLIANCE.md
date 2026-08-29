# Compliance rules this codebase has to keep

Source: `Alfies-Compliance-Brief.pdf` (prepared 19 Aug 2026). That document is
the reasoning; this file is the short list you check a pull request against.
Neither is legal advice, and vaping law in Canada moves at all three levels —
re-read the brief before launch and have SMDHU look at staging.

Three regimes stack and the strictest wins: **TVPA + VPPR** (federal — what the
site may say and show), **SFOA 2017** (Ontario — who may sell and what may be
displayed), **SMDHU + City of Barrie** (registration, inspection, zoning).

## Load-bearing, do not undo

- **The health warning text is prescribed.** `HEALTH_WARNING` in
  `src/data/store.ts` reproduces one of the two permitted *advertising*
  warnings verbatim. Do not edit the string, do not merge it with the
  *packaging* warning ("Nicotine is highly addictive"), do not shorten it.
- **The warning block is a typographic spec, not a sentence.**
  `src/components/HealthWarning.tsx` + `.health-warning` in `globals.css`:
  ≥20% of the first screen, bordered at 3% of the shortest side, warning box
  60-70% of the area inside the border, standard sans serif, first word bold
  caps, attributed to Health Canada.

  THREE PRESCRIBED RULES ARE NOT MET, all at the client's explicit request:
  s. 14 (>=20% of the first screen) and s. 19 (60-70% share) were traded for a
  fixed 40px bar, and s. 21's black-on-white was inverted to white-on-black
  with a white border to suit the dark palette. Each is a CSS-only change to
  restore and each is recorded at the point it is broken. Re-measure if you
  change the layout.
- **The age gate is server-side.** `src/middleware.ts` rewrites every unverified
  request to `/age-check` and 404s product imagery, including the
  `/_next/image` back door. A client-side overlay is not a gate: the markup has
  already been sent. Health Canada has said a check-box attestation is not
  sufficient, so the gate takes a date of birth — used once, never stored.
- **Nothing in `metadata` names a product.** Search results and link previews
  render outside the gate. No OG image of a product, ever.
- **No Schedule 3 flavour categories in our own voice.** TVPA s. 30.48 and
  Schedule 3 prohibit indicating a confectionery, dessert, cannabis, soft drink
  or energy drink flavour. No Dessert facet, no Drinks facet, and no facet
  label, blurb, tagline or heading that says candy, cola, energy, cheesecake,
  custard and so on. Check `PROFILE_DEFS` in `src/data/home.ts` before adding a
  facet.
- **No people, characters or animals. Anywhere.** s. 30.21 deems a depiction of
  any person, character or animal — real or fictional — a testimonial, and
  testimonials are prohibited however displayed. No mascot, no staff photo, no
  customer, no hand holding a device, no illustrated face.
- **No testimonials, reviews, ratings or endorsement register.** No review
  widget, no star ratings, no `aggregateRating` in structured data, and no copy
  that implies customers vouch for a product ("fan favourites", "known for").
- **No health-benefit or comparative claims.** Never "safer than smoking",
  "cleaner", "helps you quit", or any comparison against tobacco. Do not
  position the shop as a cessation service.
- **No lifestyle advertising.** No association with glamour, recreation,
  excitement, vitality, risk, daring or a way of life. Sell stock and hours.
- **Nothing misleading about a product characteristic.** Product art whose
  printed nicotine strength contradicts the shelf gets pulled — that is why the
  supplied OXBAR Oxhukka renders, which print 20 mg/mL against a 6 mg shelf,
  are not used. Those two cards now show crops of our own shelf photo instead —
  the 6 mg stock itself, framed to the box front so that neither image states a
  nicotine strength and neither can contradict the shelf. Before publishing any
  product image, check the strength printed on it against what is stocked. If a
  price is ever displayed it must be the real one; the build currently shows
  none.
- **No sponsorship, contests, giveaways, loyalty points or discount banners.**
- **The logo stays a wordmark.** No vapour cloud, no device, no swirl — in the
  logo, the favicon, an app icon, an OG image, section dividers, 404 art or any
  decorative motif. A pictorial mark turns the mark itself into vaping-product
  advertising and drags the whole warning format onto every surface it lands on.

## Still outstanding — not code

1. **Confirm the specialty vape store registration with SMDHU** and get the
   number in writing. Everything else is contingent: the flavour catalogue, the
   in-store display, and most of what is on these pages are lawful for a
   registered specialty vape store and not for a general retailer. The 85%
   test needs a CPA certificate.
2. **Real contact details.** `STORE.email`, `STORE.instagram` and
   `STORE.facebook` in `src/data/store.ts` are still placeholders.
3. **Decide on third-party age verification.** A date of birth is the minimum
   defensible step above a check-box, not verification. Price an ID-check
   provider and put the choice to the owner in writing so the risk is accepted
   knowingly.
4. **Have SMDHU review the staging site** before launch. Tobacco enforcement
   officers advise as well as inspect.
5. **Legal review** of anything commercially significant, and of the privacy
   notice at `/privacy` before it goes live.
6. **Watch Bill 125** (would raise the age to 21, ban online sales, restrict
   flavours to tobacco). A private member's bill on its fourth iteration — do
   not architect around it, but do not build a checkout assuming online sales
   are permanently safe either.
