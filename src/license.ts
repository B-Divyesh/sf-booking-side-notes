const SLUG = 'booking-side-notes';
const KEY = `sb_license:${SLUG}`;
const VERDICT_KEY = `sb_license_verdict:${SLUG}`;
const API = 'https://api.sociobot.in/api/v1';
const ONE_DAY = 86_400_000;

interface CachedVerdict { valid: boolean; checkedAt: number }

export interface LicenseState {
  unlocked: boolean;
  checking: boolean;
  notice?: string;
}

export function checkoutUrl(): string {
  return `${API}/products/${SLUG}/checkout`;
}

export function captureLicenseFromUrl(): boolean {
  const url = new URL(location.href);
  const token = url.searchParams.get('license');
  if (!token) return false;
  localStorage.setItem(KEY, token);
  localStorage.removeItem(VERDICT_KEY);
  url.searchParams.delete('license');
  history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  return true;
}

function cachedVerdict(): CachedVerdict | null {
  try { return JSON.parse(localStorage.getItem(VERDICT_KEY) || 'null') as CachedVerdict | null; }
  catch { return null; }
}

export function initialLicenseState(justCaptured = false): LicenseState {
  const token = localStorage.getItem(KEY);
  const cached = cachedVerdict();
  return {
    unlocked: Boolean(token && (justCaptured || cached?.valid)),
    checking: Boolean(token && (!cached || Date.now() - cached.checkedAt >= ONE_DAY)),
  };
}

export async function verifyLicense(force = false): Promise<LicenseState> {
  const token = localStorage.getItem(KEY);
  if (!token) return { unlocked: false, checking: false };
  const cached = cachedVerdict();
  if (!force && cached && Date.now() - cached.checkedAt < ONE_DAY) {
    return { unlocked: cached.valid, checking: false };
  }
  try {
    const response = await fetch(`${API}/products/${SLUG}/verify?license=${encodeURIComponent(token)}`);
    if (!response.ok) throw new Error('verify unavailable');
    const result = await response.json() as { valid: boolean };
    localStorage.setItem(VERDICT_KEY, JSON.stringify({ valid: result.valid, checkedAt: Date.now() }));
    return {
      unlocked: result.valid,
      checking: false,
      notice: result.valid ? 'Trail Kit restored on this device.' : 'License no longer active.',
    };
  } catch {
    return {
      unlocked: Boolean(cached?.valid),
      checking: false,
      notice: 'Could not verify the license while offline. Your free tools still work.',
    };
  }
}

export function restoreLicense(token: string): void {
  localStorage.setItem(KEY, token.trim());
  localStorage.removeItem(VERDICT_KEY);
}
