import { readFileSync, statSync } from 'node:fs';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url));
}

function assertPng(path, expectedWidth, expectedHeight) {
  const file = read(path);
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  assert(file.length > 10_000, `${path} is too small to be a real social preview image`);
  assert(file.subarray(0, 8).equals(signature), `${path} is not a PNG file`);
  assert(file.readUInt32BE(16) === expectedWidth, `${path} width must be ${expectedWidth}px`);
  assert(file.readUInt32BE(20) === expectedHeight, `${path} height must be ${expectedHeight}px`);
}

function assertSourceIncludes(path, expected) {
  const source = read(path).toString('utf8');
  assert(source.includes(expected), `${path} must include: ${expected}`);
}

function assertSourceExcludes(path, forbidden) {
  const source = read(path).toString('utf8');
  assert(!source.includes(forbidden), `${path} must not include: ${forbidden}`);
}

function assertFileAbsent(path) {
  try {
    statSync(new URL(`../${path}`, import.meta.url));
    throw new Error(`${path} must not be present`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

assertPng('public/og-image.png', 1200, 630);
assertSourceIncludes('src/components/layout/Header.astro', 'aria-label="KC — Kevin Chang home"');
assertSourceExcludes('src/components/sections/ContactFooter.astro', 'text-zinc-500');
assertSourceIncludes('src/components/sections/ExperienceTimeline.astro', "import { render, type CollectionEntry } from 'astro:content';");
assertSourceIncludes('src/components/sections/ExperienceTimeline.astro', 'summary={item.summary}');
assertSourceIncludes('src/components/sections/ExperienceCard.astro', 'summary: AstroComponentFactory;');
assertSourceExcludes('src/components/sections/ExperienceCard.astro', 'entry.body');
assertSourceIncludes('src/components/layout/NavMenu.astro', "const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex=\"-1\"])';");
assertSourceIncludes('src/components/layout/NavMenu.astro', 'function trapFocus(event: KeyboardEvent)');
assertSourceIncludes('src/components/layout/NavMenu.astro', "event.key === 'Escape'");
assertSourceIncludes('src/components/layout/NavMenu.astro', "event.key !== 'Tab'");
assertSourceIncludes('src/components/layout/NavMenu.astro', 'firstFocusable.focus();');
assertSourceIncludes('src/components/layout/NavMenu.astro', 'lastFocusable.focus();');
assertSourceIncludes('src/components/layout/NavMenu.astro', 'toggle.focus();');
assertSourceIncludes('netlify.toml', '# TODO: Tighten script-src and style-src to hashes once Astro CSP nonce support stabilises.');
assertSourceIncludes('netlify.toml', 'for = "/*"');
assertSourceIncludes('netlify.toml', 'Content-Security-Policy = "default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; font-src \'self\'; img-src \'self\' data:; connect-src \'none\'; frame-ancestors \'none\'; base-uri \'self\'; form-action \'self\'"');

try {
  statSync(new URL('../public/.DS_Store', import.meta.url));
  throw new Error('public/.DS_Store must not be present because files in public/ are published as-is');
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

// Guard: print.css must hide the button by id (not stale class selector)
assertSourceIncludes('src/styles/print.css', '#theme-toggle');
assertSourceExcludes('src/styles/print.css', '.theme-toggle');

// Guard: OG image dimensions must be declared for social parsers
assertSourceIncludes('src/layouts/BaseLayout.astro', 'og:image:width');
assertSourceIncludes('src/layouts/BaseLayout.astro', 'og:image:height');

// Guard: resume.html must not be indexed (avoids SEO dilution)
assertSourceIncludes('public/resume.html', 'noindex');

// Guard: dead components must not reappear
assertFileAbsent('src/components/sections/About.astro');
assertFileAbsent('src/components/sections/ImpactBanner.astro');
assertFileAbsent('src/components/sections/Specializations.astro');

console.log('Site validation checks passed.');
