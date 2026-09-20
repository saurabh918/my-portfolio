import { useCallback, useEffect, useRef, useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { navLinks, profile } from '../../data/profile'

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduceMotion
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)
  const reduceMotion = usePrefersReducedMotion()

  const closeMenu = useCallback(() => setOpen(false), [])
  const openMenu = useCallback(() => setOpen(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      setMenuMounted(true)

      if (reduceMotion) {
        setMenuVisible(true)
        return undefined
      }

      setMenuVisible(false)
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMenuVisible(true))
      })
      return () => cancelAnimationFrame(frame)
    }

    setMenuVisible(false)
    return undefined
  }, [open, reduceMotion])

  useEffect(() => {
    if (!open && reduceMotion && menuMounted) {
      setMenuMounted(false)
      toggleRef.current?.focus({ preventScroll: true })
    }
  }, [open, reduceMotion, menuMounted])

  useEffect(() => {
    document.body.style.overflow = menuMounted ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuMounted])

  useEffect(() => {
    if (!menuMounted) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuMounted, closeMenu])

  useEffect(() => {
    if (open && menuVisible && menuMounted) {
      const firstLink = menuRef.current?.querySelector('a')
      firstLink?.focus({ preventScroll: true })
    }
  }, [open, menuVisible, menuMounted])

  const handleMenuTransitionEnd = (event) => {
    if (event.propertyName !== 'opacity') return

    if (!open) {
      setMenuMounted(false)
      toggleRef.current?.focus({ preventScroll: true })
    }
  }

  const handleToggle = () => {
    if (open) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const menuClassName = [
    'nav-mobile-menu border-t border-line bg-page px-5 py-4 lg:hidden',
    menuVisible ? 'is-open' : 'is-closing',
  ].join(' ')

  const showCloseIcon = open

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled || menuMounted
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
          ref={toggleRef}
          type="button"
          className="nav-toggle inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface text-ink hover:bg-surface-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={handleToggle}
        >
          <span className="nav-toggle-icon" aria-hidden="true">
            <HiOutlineMenu size={20} data-visible={!showCloseIcon} />
            <HiOutlineX size={20} data-visible={showCloseIcon} />
          </span>
        </button>
      </div>

      {menuMounted ? (
        <div id="mobile-nav" ref={menuRef} className={menuClassName}>
          <div className="nav-mobile-menu-inner" onTransitionEnd={handleMenuTransitionEnd}>
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      style={{ '--link-index': Math.min(index, 5) }}
                      className="nav-mobile-link rounded-lg px-2 py-3 text-base text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={profile.resumeHref}
                    download
                    onClick={closeMenu}
                    style={{ '--link-index': Math.min(navLinks.length, 5) }}
                    className="nav-mobile-link btn-secondary mt-2 inline-flex min-h-[2.75rem] px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99]"
                  >
                    Resume
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}
