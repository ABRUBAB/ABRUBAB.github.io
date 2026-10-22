/** "#9bc53d" → "155 197 61" (space-separated triplet for rgb(var(--x) / a)). */
export function hexToTriplet(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}
