import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

const buildId = (() => {
  try { return execSync('git rev-parse --short HEAD').toString().trim(); }
  catch { return 'local'; }
})();

export default defineConfig({
  define: { __BUILD_ID__: JSON.stringify(buildId) },
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    sourcemap: true,
  },
  server: { host: '127.0.0.1' },
});
