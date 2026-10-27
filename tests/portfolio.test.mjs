import assert from 'node:assert/strict';
import { before, after, test } from 'node:test';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = mkdtempSync(join(tmpdir(), 'portfolio-test-'));
const draftPath = join(root, 'src/content/insights/regression-draft.md');
const canonicalPath = join(root, 'src/content/insights/regression-canonical.md');
const read = (path) => readFileSync(join(output, path), 'utf8');
const htmlFiles = (dir = output) => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? htmlFiles(join(dir, entry.name)) : entry.name.endsWith('.html') ? [join(dir, entry.name)] : []);
const schemas = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const meta = (html, key) => [...html.matchAll(/<meta\b[^>]*>/g)].map(m => m[0]).find(tag => attribute(tag, 'property') === key || attribute(tag, 'name') === key);
const canonical = (html) => attribute(html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? '', 'href');

before(() => {
  // Build isolated output, so npm test can never pass against stale dist/.
  const hasInsights = existsSync(join(root, 'src/content/insights'));
  const createdFixtures = [];
  try {
    if (hasInsights) {
      const frontmatter = 'title: Regression fixture\ntopic: Applied AI\ndate: 2026-10-27\nsummary: A temporary fixture for publication boundary checks.\n';
      writeFileSync(draftPath, `---\n${frontmatter}status: draft\n---\nPRIVATE_DRAFT_MARKER` , { flag: 'wx' });
      createdFixtures.push(draftPath);
      writeFileSync(canonicalPath, `---\n${frontmatter}status: published\ncanonicalUrl: https://example.org/original-article\n---\nPublic fixture.`, { flag: 'wx' });
      createdFixtures.push(canonicalPath);
    }
    execFileSync(process.execPath, ['node_modules/astro/astro.js', 'build', '--outDir', output], { cwd: root, stdio: 'pipe' });
  } finally {
    for (const path of createdFixtures) rmSync(path, { force: true });
  }
});
after(() => rmSync(output, { recursive: true, force: true }));

test('unsupported metrics and private projects stay out of all rendered pages', () => {
  for (const path of htmlFiles()) {
    const html = readFileSync(path, 'utf8');
    assert.doesNotMatch(html, /1,?200\+|60\+ (?:educational|clients|institutions)|\$50M|500\+ academic|944-test|\$0\.03|20\+ NZ|100\+ socioeconomic|50\+ policy/);
    assert.doesNotMatch(html, /ai-bank-pricing-engine|NZ-Stats-Intelligence-Dashboard|nz-election-monitor-2026/);
  }
});

test('featured work links to a sourced six-part case study and stays in the resume', () => {
  assert.match(read('index.html'), /href="\/work\/automated-psychometrics\/"/);
  const html = read('work/automated-psychometrics/index.html');
  for (const label of ['Problem', 'Approach', 'Trade-offs', 'Evidence', 'Outcome', 'Lessons']) assert.match(html, new RegExp(`>${label}<`));
  assert.match(html, /https:\/\/doi.org\/10.1371\/journal.pone.0257682/);
  assert.match(html, /https:\/\/github.com\/kcha193\/AutoPsychShiny/);
  assert.match(html, /Collaborative research/);
  assert.match(read('resume/index.html'), /Automated Psychometrics/);
  assert.match(read('resume/index.html'), /noindex, follow/);
});

test('three Insights outlines have accessible reading routes and Article identity', () => {
  const index = read('insights/index.html');
  for (const slug of ['banking-pricing-trade-offs', 'applied-ai-review-boundaries', 'decisions-before-dashboards']) {
    assert.match(index, new RegExp(`href="/insights/${slug}/"`));
    const html = read(`insights/${slug}/index.html`);
    assert.match(html, /Article outline/);
    assert.match(html, /<time[^>]*datetime="2026-10-27T00:00:00.000Z"/);
    assert.match(html, /id="main-content"/);
    const article = schemas(html).find(s => s['@type'] === 'Article');
    assert.ok(article);
    assert.equal(article.creativeWorkStatus, 'Outline');
    assert.equal(article.author['@id'], 'https://kevin-cv.netlify.app/#person');
    assert.equal(article.mainEntityOfPage, `https://kevin-cv.netlify.app/insights/${slug}/`);
  }
});

test('drafts have no route and leak into no rendered page or sitemap', () => {
  assert.equal(existsSync(join(output, 'insights/regression-draft/index.html')), false);
  for (const path of htmlFiles()) assert.doesNotMatch(readFileSync(path, 'utf8'), /PRIVATE_DRAFT_MARKER|regression-draft/);
  assert.doesNotMatch(read('sitemap-0.xml'), /regression-draft/);
});

test('route-specific and external canonical URLs agree with social and Article metadata', () => {
  for (const path of ['insights/index.html', 'work/automated-psychometrics/index.html', 'insights/banking-pricing-trade-offs/index.html', 'insights/regression-canonical/index.html']) {
    const html = read(path);
    const expected = path.includes('regression-canonical') ? 'https://example.org/original-article' : `https://kevin-cv.netlify.app/${path.replace('index.html', '')}`;
    assert.equal(canonical(html), expected);
    assert.equal(attribute(meta(html, 'og:url') ?? '', 'content'), expected);
    const person = schemas(html).find(s => s['@type'] === 'Person');
    assert.equal(person['@id'], 'https://kevin-cv.netlify.app/#person');
    const article = schemas(html).find(s => s['@type'] === 'Article');
    if (article) {
      assert.equal(article.mainEntityOfPage, expected);
      assert.equal(attribute(meta(html, 'og:type') ?? '', 'content'), 'article');
    }
  }
  const sitemap = read('sitemap-0.xml');
  assert.match(sitemap, /\/insights\/banking-pricing-trade-offs\//);
  assert.doesNotMatch(sitemap, /\/resume\/?</);
});

test('all internal links and fragments resolve, including detail-page navigation', () => {
  for (const path of htmlFiles()) {
    const html = readFileSync(path, 'utf8');
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, path);
    if (html.includes('class="skip-link"')) {
      assert.equal(attribute(html.match(/<main\b[^>]*>/)?.[0] ?? '', 'tabindex'), '-1', `Skip target must accept focus: ${path}`);
    }
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate IDs: ${path}`);
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const url = new URL(href, `https://kevin-cv.netlify.app/${path.slice(output.length + 1).replace('index.html', '')}`);
      const target = url.pathname.endsWith('/') ? `${url.pathname}index.html` : `${url.pathname}/index.html`;
      const targetPath = join(output, target);
      assert.ok(existsSync(targetPath), `${path}: missing ${href}`);
      if (url.hash) assert.match(readFileSync(targetPath, 'utf8'), new RegExp(`id="${url.hash.slice(1)}"`), `${path}: missing ${href}`);
    }
    if (path.includes('/insights/') || path.includes('/work/')) assert.match(html, /href="\/#experience"/);
  }
});

test('a fixture collision never deletes an existing content file', () => {
  const existing = 'Existing content must survive a rejected fixture write.\n';
  writeFileSync(canonicalPath, existing, { flag: 'wx' });
  try {
    const childEnv = { ...process.env };
    delete childEnv.NODE_TEST_CONTEXT;
    const child = spawnSync(process.execPath, ['--test', '--test-name-pattern=unsupported metrics', 'tests/portfolio.test.mjs'], { cwd: root, encoding: 'utf8', env: childEnv });
    assert.ifError(child.error);
    assert.notEqual(child.status, 0, 'A fixture collision must reject the test build');
    assert.ok(existsSync(canonicalPath), 'Rejected fixture write deleted existing content');
    assert.equal(readFileSync(canonicalPath, 'utf8'), existing);
    assert.equal(existsSync(draftPath), false, 'The earlier successful fixture write must still be cleaned');
  } finally {
    rmSync(canonicalPath, { force: true });
  }
});
