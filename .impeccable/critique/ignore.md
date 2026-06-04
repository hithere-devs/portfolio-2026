# Critique ignore list

Findings listed here are intentional design decisions. Future `/impeccable critique` runs should drop matching findings silently.

- **Hero portrait is dark/desaturated on initial load** (`src/components/hero-section.tsx`). The `brightness(0.2) grayscale(100%)` → full-color reveal tied to scroll is a deliberate dramatic effect chosen by the owner. Do not flag the "empty/dark first paint" as an issue.
