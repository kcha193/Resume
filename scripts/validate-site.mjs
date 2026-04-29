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

assertPng('public/og-image.png', 1200, 630);
assertSourceIncludes('src/components/layout/Header.astro', 'aria-label="KC — Kevin Chang home"');
assertSourceExcludes('src/components/sections/ContactFooter.astro', 'text-zinc-500');

try {
  statSync(new URL('../public/.DS_Store', import.meta.url));
  throw new Error('public/.DS_Store must not be present because files in public/ are published as-is');
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

console.log('Site validation checks passed.');
