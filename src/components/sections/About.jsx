import { profile } from '../../data/profile'
import Reveal from '../ui/Reveal'

function About() {
  return (
    <section id="about" className="section-shell section-shell--muted section-shell--compact">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-x-10 xl:gap-x-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">About</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Professional summary
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft md:text-[17px]">
              {profile.aboutPositioning}
            </p>

            <dl className="mt-5 grid gap-0 border-t border-line">
              {profile.aboutFacts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={`grid grid-cols-[minmax(0,7.5rem)_1fr] gap-x-4 py-2.5 ${
                    index !== profile.aboutFacts.length - 1 ? 'border-b border-line' : ''
                  }`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                    {fact.label}
                  </dt>
                  <dd className="text-sm font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="text-base leading-relaxed text-mute md:text-[17px] md:leading-7">
            {profile.aboutBrief}
          </p>
        </div>

        <div className="mt-6 border-t border-line pt-6 lg:mt-7 lg:pt-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Core strengths
          </p>

          <ol className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {profile.aboutStrengths.map((strength, index) => (
              <li key={strength.title}>
                <div className="flex gap-3">
                  <span className="shrink-0 font-mono text-sm tabular-nums text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">
                      <span className="text-mute" aria-hidden="true">
                        —{' '}
                      </span>
                      {strength.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-mute">
                      {strength.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  )
}

export default About
