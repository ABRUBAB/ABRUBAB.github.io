/**
 * SVG filter used by `.liquid` (see globals.css) as a backdrop-filter on
 * Chromium: a soft turbulence displaces whatever sits behind the glass so the
 * moving water refracts through it. Static on purpose — the canvas behind is
 * what animates, which keeps the cost of the filter negligible.
 */
export default function LiquidDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="pointer-events-none absolute h-0 w-0">
      <defs>
        <filter id="liquid-glass" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.016" numOctaves="2" seed="11" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.6" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
