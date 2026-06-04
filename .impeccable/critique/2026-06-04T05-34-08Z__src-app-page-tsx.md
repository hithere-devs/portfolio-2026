---
target: home page
total_score: 27
p0_count: 0
p1_count: 2
timestamp: 2026-06-04T05-34-08Z
slug: src-app-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scroll-progress rail, sticky-nav state, active pills and synced timeline dot are strong; external links give no "opens new tab" cue |
| 2 | Match System / Real World | 3 | Clear section language; skill icons are icon-only (meaning hidden until hover tooltip) |
| 3 | User Control and Freedom | 2 | Global `cursor: none` replaces the native pointer; no reduced-motion path |
| 4 | Consistency and Standards | 3 | Cohesive card/pill/type system; hamburger-only nav + custom cursor break platform convention |
| 5 | Error Prevention | 3 | Few inputs; little to get wrong (largely n/a) |
| 6 | Recognition Rather Than Recall | 2 | Desktop nav hidden behind a bubble menu; skill labels behind hover |
| 7 | Flexibility and Efficiency | 2 | 400vh hero = ~4 screens of scroll before content; no keyboard accelerators |
| 8 | Aesthetic and Minimalist Design | 3 | Bold, committed type; but first paint is near-empty and decoration (blobs/grid/doodles) piles up |
| 9 | Error Recovery | 3 | No error states present (largely n/a) |
| 10 | Help and Documentation | 3 | Self-explanatory for a portfolio (largely n/a) |
| **Total** | | **27/40** | **Acceptable, edging toward Good** |

## Anti-Patterns Verdict

**LLM assessment:** This does NOT immediately scream "AI made this." It has a real point of view: oversized black-weight typography, a sticky-scroll experience where the company name syncs to the active card, orbiting Resume/Read-More/See-Works buttons, and giant parallax section watermarks. That POV lifts it above template-zone. But several decorative tells pull it back: gradient text on key headings, animated gradient blobs (`animate-blob`), a dotted background grid, floating SVG doodles, and multiple radial spotlights, the standard "dark SaaS hero" vocabulary.

**Deterministic scan (`detect.mjs`):** 5 findings, all `gradient-text` (a flagged tell): `contact-cta.tsx:22` ("your ideas to life?"), `hero-section.tsx:98` (DEVELOPER fade) & `:228` ("Voice AI Agents"), `nav.tsx:175` (menu hover), `sticky-scroll-experience.tsx:47` (company name). Agreement: the LLM review independently flagged the same gradient-text overuse. No false positives.

**Visual overlays:** Not injected; assessment is from full-page screenshots at each scroll state plus the CLI scan.

## Overall Impression
Genuinely impressive craft, this already reads as "a senior built this." The single biggest opportunity is the first 2 seconds: on initial load the hero is a near-empty black screen because the central portrait starts at `brightness(0.2) grayscale(100%)` and only resolves after scrolling. The dramatic dark-to-reveal is a great idea that currently costs you the most important moment for a skeptical, time-pressed recruiter.

## What's Working
1. **Typographic confidence.** The `text-[13vw] font-black` FULL STACK / DEVELOPER stack and the black-weight section heads carry real authority. On-brief for "bold, modern, confident."
2. **The sticky-scroll experience section.** Company name on the left syncing to the in-view card on the right is a memorable, well-executed pattern, exactly the "the site is the proof" principle.
3. **Cohesive motion + component system.** Spotlight cards, magnetic buttons, animated pills (`layoutId`), the global scroll rail. Consistent and polished.

## Priority Issues

- **[P1] Hero's first paint is nearly empty.** The portrait, the hero's whole subject, is almost invisible on load (dark/desaturated until ~15% scroll), so the opening frame is faint text on black.
  - **Why it matters:** Your #1 goal is "impress on first scroll" for recruiters who decide in seconds. A near-blank first frame risks a bounce before the payoff.
  - **Fix:** Raise the portrait's base state at scroll 0 (e.g. brightness ~0.6, partial color) so it reads instantly, then let the reveal add the final pop. Keep the drama, don't spend the first impression on black.
  - **Suggested command:** /impeccable polish

- **[P1] Desktop navigation is hidden behind a bubble/hamburger menu.** All links live behind one click even on wide screens (the source comment shows this was an undecided call).
  - **Why it matters:** Recruiters scanning fast can't see the site has Projects/Experience/Skills at a glance; hurts recognition and efficiency.
  - **Fix:** Show inline nav links on desktop; keep the bubble menu for mobile.
  - **Suggested command:** /impeccable layout

- **[P2] Gradient text on key headings (5x).** Especially the contact head "your ideas to life?" (primary → primary/50 reads dimmer) and heading fades-to-transparent.
  - **Why it matters:** Flagged AI tell and it lowers legibility on your highest-intent CTA.
  - **Fix:** Solid color; drive emphasis with weight/scale, not a gradient.
  - **Suggested command:** /impeccable typeset

- **[P2] Decorative tells stack up.** Animated blobs, dotted grid, floating doodles, multiple spotlights.
  - **Why it matters:** Collectively they read as generic dark-hero vocabulary and dilute your real POV.
  - **Fix:** Cut one or two; replace with something personal/branded so the distinctive parts get louder.
  - **Suggested command:** /impeccable quieter

- **[P2] Mixed availability message.** Hero says "Open to Senior Developer Roles"; contact says "I love my full-time job... only open for consultations and freelance."
  - **Why it matters:** Recruiters (your stated primary audience) get a contradictory signal at the conversion moment.
  - **Fix:** Reconcile the two; pick one primary intent and make the CTA match.
  - **Suggested command:** /impeccable clarify

## Persona Red Flags

**Priya (Recruiter, project-specific from PRODUCT.md):** Arrives from LinkedIn on desktop with ~20 seconds. First frame is a dark near-empty screen (portrait invisible) → may leave before the reveal. Can't see the section structure (hamburger-only). Hits the contradictory availability message. Resume button only appears after scrolling into the about-state.

**Jordan (First-Timer):** Bubble-only nav with no visible destinations; skill icons have no visible labels (hover tooltip only); the custom spring cursor is disorienting. Unsure where to start.

**Casey (Distracted Mobile):** Hover-gated skill icons stay grayscale/dim on touch (no hover), so the skills wall looks muted; magnetic/spotlight effects never fire; the 400vh hero is a lot of thumb-scrolling; several hero accents (typewriter tagline, social cluster) are `md:`-only and vanish on mobile.

## Minor Observations
- External links open in new tabs with no affordance/icon.
- `cursor: none` means a JS hiccup could leave no visible cursor at all.
- Only 2 featured projects, so those cards carry a lot of empty space.
- Skill tabs wrap to two rows (6 tabs); fine, but slightly busy.

## Questions to Consider
- What would a recruiter see in the first second if the portrait were already visible?
- Does hiding desktop nav buy enough "cool" to be worth the lost scanability?
- Which two decorative effects could you delete and lose nothing?
