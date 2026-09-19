import { profile } from '../../data/profile'

export default function Footer() {
  return (
    <footer id="site-footer" className="border-t border-line bg-page-muted">
      <div className="mx-auto flex max-w-site flex-col gap-3 px-5 py-8 pr-6 text-sm text-mute sm:pr-8 md:flex-row md:items-center md:justify-between md:px-8 md:pr-52 lg:pr-56">
        <p>© 2026 {profile.name}</p>
        <p className="font-mono text-xs uppercase tracking-[0.18em] md:text-right">
          {profile.title} · React.js
        </p>
      </div>
    </footer>
  )
}
