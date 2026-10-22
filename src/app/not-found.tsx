import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_0%,rgb(61_99_255/0.5),transparent_65%),radial-gradient(70%_70%_at_0%_100%,rgb(7_15_61/0.9),transparent_60%)]"
      />
      <div className="relative">
        <p className="label">Page not found</p>
        <h1 className="display outline-text mt-4 text-[clamp(7rem,28vw,22rem)] [--outline:rgb(245_244_241/0.4)]">404</h1>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-ash-50 px-6 text-[15px] font-medium text-ink transition-colors hover:bg-white"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
