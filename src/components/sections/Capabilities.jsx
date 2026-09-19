import { capabilities } from '../../data/profile'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-shell section-shell--surface">
      <Reveal>
        <SectionHeading
          eyebrow="What I do"
          title="Capabilities"
          description="Areas where I deliver production frontend work — from dashboards and CMS sites to API integration and independent ownership."
        />
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((item) => (
          <Reveal key={item.title}>
            <article className="surface-soft surface-hover h-full">
              <span className="font-mono text-sm text-accent" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
