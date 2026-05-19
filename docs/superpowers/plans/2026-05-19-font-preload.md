# Inter Variable Font Preload Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `<link rel="preload">` for Inter Variable (Latin subset) WOFF2 to reduce First Contentful Paint, using a stable `/fonts/` URL with immutable cache headers (already configured in `netlify.toml`).

**Architecture:** Copy the Latin WOFF2 from `node_modules/@fontsource-variable/inter/files/` to `public/fonts/`. Replace the `@import "@fontsource-variable/inter"` in `global.css` with an explicit `@font-face` pointing to `/fonts/inter-latin-wght-normal.woff2`. Add the preload `<link>` in `BaseLayout.astro`. JetBrains Mono (used only for mono/dates) is not preloaded — it is not on the critical render path.

**Tech Stack:** Astro 5 `BaseLayout.astro`, `src/styles/global.css`, `public/fonts/`.

---

## File map

| Action | Path | Responsibility |
|---|---|---|
| **Copy** | `public/fonts/inter-latin-wght-normal.woff2` | Stable font URL for preload and `@font-face` |
| **Modify** | `src/styles/global.css:2` | Replace `@import` with `@font-face` for Latin subset |
| **Modify** | `src/layouts/BaseLayout.astro` | Add `<link rel="preload">` in `<head>` |
| **Modify** | `scripts/validate-site.mjs` | Add guards for preload and font-face entries |

---

### Task 1: Write the failing test guards

**Files:**
- Modify: `scripts/validate-site.mjs`

- [ ] **Step 1: Add two guards to validate-site.mjs**

Append the following two assertions to `scripts/validate-site.mjs`, before the final `console.log`:

```js
// Guard: Inter Variable must be served from /fonts/ (stable URL for preload)
assertSourceIncludes('src/styles/global.css', '/fonts/inter-latin-wght-normal.woff2');

// Guard: BaseLayout must preload the Inter Variable latin font
assertSourceIncludes('src/layouts/BaseLayout.astro', 'rel="preload"');
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
npm test
```

Expected output:
```
Error: src/styles/global.css must include: /fonts/inter-latin-wght-normal.woff2
```

---

### Task 2: Copy the font file

**Files:**
- Copy to: `public/fonts/inter-latin-wght-normal.woff2`

- [ ] **Step 1: Create the fonts directory and copy the file**

```bash
mkdir -p public/fonts
cp node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2 \
   public/fonts/inter-latin-wght-normal.woff2
```

- [ ] **Step 2: Verify the file is present**

```bash
ls -lh public/fonts/inter-latin-wght-normal.woff2
```

Expected: file exists, size ~100–200 KB.

---

### Task 3: Update `global.css` — replace `@import` with `@font-face`

**Files:**
- Modify: `src/styles/global.css:2`

- [ ] **Step 1: Replace the Inter import**

In `src/styles/global.css`, replace line 2:

```diff
-@import "@fontsource-variable/inter";
+@font-face {
+  font-family: 'Inter Variable';
+  font-style: normal;
+  font-display: swap;
+  font-weight: 100 900;
+  src: url('/fonts/inter-latin-wght-normal.woff2') format('woff2-variations');
+  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
+}
```

The `@import "@fontsource-variable/jetbrains-mono"` on line 3 is **unchanged** — JetBrains Mono continues to load via Vite.

The `font-family: 'Inter Variable'` name matches the existing CSS custom property `--font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif` in `global.css`, so no other CSS changes are needed.

---

### Task 4: Add `<link rel="preload">` in BaseLayout.astro

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Add preload link inside `<head>`**

In `src/layouts/BaseLayout.astro`, add the preload link directly after the `<link rel="sitemap">` line (around line 66):

```diff
     <!-- Sitemap -->
     <link rel="sitemap" href="/sitemap-index.xml" />
+
+    <!-- Font preload: Inter Variable latin subset (critical render path) -->
+    <link rel="preload" href="/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
```

The `crossorigin` attribute is required for font preloads even for same-origin fonts — omitting it causes the browser to fetch the font twice.

---

### Task 5: Verify and commit

- [ ] **Step 1: Run the full test suite and build**

```bash
npm test && npm run build
```

Expected: `Site validation checks passed.` and clean build.

- [ ] **Step 2: Visual check in DevTools**

```bash
npm run preview
```

Open `http://localhost:4321` in Chrome. Open DevTools → Network tab → filter by "Font". Reload with cache disabled (Ctrl+Shift+R).

Verify:
- `inter-latin-wght-normal.woff2` loads from `/fonts/inter-latin-wght-normal.woff2`
- Its "Initiator" column shows `<link rel=preload>` (not a stylesheet)
- The font loads before first paint (appears early in the waterfall)
- No duplicate Inter font requests from `/_astro/` (the old `@import` path is gone)

- [ ] **Step 3: Commit all changes**

```bash
git add public/fonts/inter-latin-wght-normal.woff2 \
        src/styles/global.css \
        src/layouts/BaseLayout.astro \
        scripts/validate-site.mjs
git commit -m "perf: preload Inter Variable via public/fonts/ for faster FCP"
```

---

## Self-review

**Spec coverage:**
- [x] `<link rel="preload">` for Inter Variable WOFF2 added — Task 4
- [x] Stable URL under `/fonts/` (not hashed `/_astro/`) — Task 2 + 3
- [x] `netlify.toml` already has `for = "/fonts/*"` immutable cache header — no change needed
- [x] Validate-site guards added — Task 1

**Placeholder scan:** None found.

**Type consistency:** No type changes — this is purely CSS/HTML.

**Tradeoff note:** Replacing `@import "@fontsource-variable/inter"` with a Latin-only `@font-face` drops Cyrillic/Greek/Vietnamese subsets. The resume is English-only content, so this is an acceptable tradeoff. If non-Latin characters are added to the site later, add additional `@font-face` blocks for the relevant subsets from `node_modules/@fontsource-variable/inter/files/`.
