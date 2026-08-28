import { readFile, writeFile } from 'node:fs/promises';

let html = await readFile('dist/index.html', 'utf8');
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1]);
const scriptPath = assets.find((asset) => asset.endsWith('.js'));
const stylePath = assets.find((asset) => asset.endsWith('.css'));
if (scriptPath && stylePath) {
  const [script, style] = await Promise.all([readFile(`dist${scriptPath}`, 'utf8'), readFile(`dist${stylePath}`, 'utf8')]);
  html = html
    .replace(/<script type="module" crossorigin src="\/assets\/[^"]+"><\/script>/, `<script type="module">${script}</script>`)
    .replace(/<link rel="stylesheet" crossorigin href="\/assets\/[^"]+">/, `<style>${style}</style>`);
  await writeFile('dist/index.html', html);
}
const shell = ['/', '/index.html', '/offline.html', '/manifest.webmanifest', '/privacy/', '/terms/', '/legal.css', '/robots.txt', '/assets/hero-map-480.avif', '/assets/hero-map.avif', '/assets/hero-map-480.webp', '/assets/hero-map.webp', '/assets/hero-map.jpg', '/assets/app-mark.svg', '/assets/icon-192.png', '/assets/icon-512.png', ...assets];
const unique = [...new Set(shell)];
const sw = await readFile('dist/sw.js', 'utf8');
const revision = assets.find((asset) => asset.endsWith('.js'))?.match(/index-([^.]+)/)?.[1] ?? Date.now().toString(36);
await writeFile('dist/sw.js', sw
  .replace("'booking-side-notes-v1'", `'booking-side-notes-${revision}'`)
  .replace("/*__PRECACHE__*/ ['/','/index.html','/offline.html']", JSON.stringify(unique)));
