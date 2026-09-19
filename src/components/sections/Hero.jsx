import { profile } from '../../data/profile'
import Chip from '../ui/Chip'

const highlights = [
  { label: 'Experience', value: `${profile.experienceYears} years` },
  { label: 'Focus', value: 'React / Next.js' },
  { label: 'Location', value: profile.location },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="section-shell relative pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="max-w-prose">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {profile.title} · {profile.experienceYears} years
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.25rem] md:leading-[1.08]">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-ink-soft md:text-xl">{profile.headline}</p>
          <p className="mt-5 text-base leading-relaxed text-mute md:text-[17px]">
            {profile.heroIntro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn-primary">
              View work
            </a>
            <a href={profile.resumeHref} download className="btn-secondary">
              View resume
            </a>
            <a href="#contact" className="btn-ghost">
              Contact me
            </a>
          </div>
        </div>

        <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-8">
          {highlights.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">{item.label}</dt>
              <dd className="mt-1.5 text-lg font-medium text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Focus areas">
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
