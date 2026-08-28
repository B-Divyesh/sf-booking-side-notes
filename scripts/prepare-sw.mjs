import { copyFile, readFile, writeFile } from 'node:fs/promises';

let html = await readFile('dist/index.html', 'utf8');
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1]);
const shell = ['/', '/demo', '/index.html', '/offline.html', '/manifest.webmanifest', '/privacy/', '/terms/', '/legal.css', '/robots.txt', '/assets/hero-map-480.avif', '/assets/hero-map.avif', '/assets/hero-map-480.webp', '/assets/hero-map.webp', '/assets/hero-map.jpg', '/assets/app-mark.svg', '/assets/icon-192.png', '/assets/icon-512.png', ...assets];
const unique = [...new Set(shell)];
const sw = await readFile('dist/sw.js', 'utf8');
const revision = assets.find((asset) => asset.endsWith('.js'))?.match(/index-([^.]+)/)?.[1] ?? Date.now().toString(36);
await writeFile('dist/sw.js', sw
  .replace("'booking-side-notes-v1'", `'booking-side-notes-${revision}'`)
  .replace(/\/\*__PRECACHE__\*\/\s*\[[^\]]*\]/, JSON.stringify(unique)));
await copyFile('staticwebapp.config.json', 'dist/staticwebapp.config.json');
