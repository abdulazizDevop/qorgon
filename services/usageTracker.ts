const KEY = "korgon_scan_count";
export const FREE_SCAN_LIMIT = 3;

export function getScanCount(): number {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function incrementScanCount(): number {
  const next = getScanCount() + 1;
  try {
    localStorage.setItem(KEY, String(next));
  } catch {
    // localStorage unavailable, silently ignore
  }
  return next;
}

export function resetScanCount(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export function hasReachedLimit(): boolean {
  return getScanCount() >= FREE_SCAN_LIMIT;
}

export function remainingScans(): number {
  return Math.max(0, FREE_SCAN_LIMIT - getScanCount());
}
