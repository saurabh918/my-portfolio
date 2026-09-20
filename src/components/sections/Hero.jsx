import { useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import Chip from '../ui/Chip'

const highlights = [
  { label: 'Experience', value: `${profile.experienceYears} years` },
  { label: 'Focus', value: 'React / Next.js' },
  { label: 'Location', value: profile.location },
]

const ctaLinks = [
  { href: '#work', label: 'View work', className: 'btn-primary' },
  { href: profile.resumeHref, label: 'View resume', className: 'btn-secondary', download: true },
  { href: '#contact', label: 'Contact me', className: 'btn-ghost' },
]

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

export default function Hero() {
  const [ready, setReady] = useState(false)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setReady(true)
      return undefined
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReady(true))
    })
    return () => cancelAnimationFrame(frame)
  }, [reduceMotion])

  return (
    <section
      id="top"
      className={`hero-sequence relative overflow-hidden border-b border-line ${ready ? 'is-ready' : ''}`}
    >
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="section-shell relative pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="max-w-prose">
          <p
            className="hero-enter-item font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
            style={{ '--hero-step': 0 }}
          >
            {profile.title} · {profile.experienceYears} years
          </p>
          <h1
            className="hero-enter-item mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.25rem] md:leading-[1.08]"
            style={{ '--hero-step': 1 }}
          >
            {profile.name}
          </h1>
          <p
            className="hero-enter-item mt-3 text-lg text-ink-soft md:text-xl"
            style={{ '--hero-step': 2 }}
          >
            {profile.headline}
          </p>
          <p
            className="hero-enter-item mt-5 text-base leading-relaxed text-mute md:text-[17px]"
            style={{ '--hero-step': 3 }}
          >
            {profile.heroIntro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {ctaLinks.map((cta, index) => (
              <a
                key={cta.href}
                href={cta.href}
                download={cta.download || undefined}
                className={`hero-enter-item ${cta.className}`}
                style={{ '--hero-step': 4 + index }}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>

        <dl
          className="hero-enter-item mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-8"
          style={{ '--hero-step': 7 }}
        >
          {highlights.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">{item.label}</dt>
              <dd className="mt-1.5 text-lg font-medium text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        <ul
          className="hero-enter-item mt-8 flex flex-wrap gap-2"
          aria-label="Focus areas"
          style={{ '--hero-step': 8 }}
        >
          {profile.focusAreas.map((item) => (
            <li key={item}>
              <Chip accent>{item}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
