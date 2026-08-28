import { readFile, writeFile } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1]);
const shell = ['/', '/index.html', '/offline.html', '/manifest.webmanifest', '/privacy/', '/terms/', '/assets/hero-map.webp', '/assets/app-mark.svg', '/assets/icon-192.png', '/assets/icon-512.png', ...assets];
const unique = [...new Set(shell)];
const sw = await readFile('dist/sw.js', 'utf8');
await writeFile('dist/sw.js', sw.replace("/*__PRECACHE__*/ ['/','/index.html','/offline.html']", JSON.stringify(unique)));
