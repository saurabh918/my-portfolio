import { useEffect, useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { navLinks, profile } from '../../data/profile'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled || open
          ? 'border-b border-line bg-page/95 backdrop-blur-md'
          : 'bg-page/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="inline-flex items-baseline text-sm font-semibold tracking-[0.06em] md:text-[15px]"
          aria-label={`${profile.name} — home`}
        >
          <span className="text-ink">SG</span>
          <span className="text-accent">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-mute transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a href={profile.resumeHref} download className="btn-secondary px-4 py-2 text-sm">
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-ink transition hover:bg-surface-raised lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <HiOutlineX size={20} /> : <HiOutlineMenu size={20} />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-page px-5 py-4 lg:hidden">
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="block rounded-lg px-2 py-3 text-base text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeHref}
                  download
                  onClick={close}
                  className="btn-secondary mt-2 inline-flex px-4 py-2 text-sm"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
