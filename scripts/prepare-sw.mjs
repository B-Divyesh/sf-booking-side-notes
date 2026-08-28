import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

let html = await readFile('dist/index.html', 'utf8');
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1]);
const shell = ['/', '/?demo=1', '/demo', '/index.html', '/offline.html', '/manifest.webmanifest', '/privacy/', '/terms/', '/legal.css', '/legal.js', '/robots.txt', '/assets/hero-map-480.avif', '/assets/hero-map.avif', '/assets/hero-map-480.webp', '/assets/hero-map.webp', '/assets/hero-map.jpg', '/assets/app-mark.svg', '/assets/icon-192.png', '/assets/icon-512.png', ...assets];
const unique = [...new Set(shell)];
const sw = await readFile('dist/sw.js', 'utf8');
const revision = assets.find((asset) => asset.endsWith('.js'))?.match(/index-([^.]+)/)?.[1] ?? Date.now().toString(36);
await writeFile('dist/sw.js', sw
  .replace("'booking-side-notes-v1'", `'booking-side-notes-${revision}'`)
  .replace(/\/\*__PRECACHE__\*\/\s*\[[^\]]*\]/, JSON.stringify(unique)));
const buildId = (() => { try { return execSync('git rev-parse --short HEAD').toString().trim(); } catch { return 'local'; } })();
for (const path of ['dist/privacy/index.html', 'dist/terms/index.html', 'dist/404.html']) {
  const page = await readFile(path, 'utf8');
  await writeFile(path, page.replaceAll('__BUILD_ID__', buildId));
}
await copyFile('staticwebapp.config.json', 'dist/staticwebapp.config.json');
