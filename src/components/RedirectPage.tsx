/**
 * Old portfolio URLs now live as sections of the one-page site (or the CV PDF).
 * Static hosting can't send a 301, so each legacy route renders a meta-refresh
 * + a script redirect + a visible link, and is marked noindex.
 */
export default function RedirectPage({ to, label }: { to: string; label: string }) {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(to)})` }} />
      <div>
        <p className="label">Moved</p>
        <a
          href={to}
          className="display mt-5 inline-block text-[clamp(2.4rem,7vw,5rem)] text-ash-50 underline decoration-white/20 underline-offset-8 transition-colors hover:decoration-cobalt-400"
        >
          {label} →
        </a>
      </div>
    </main>
  );
}
