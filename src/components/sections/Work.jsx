import { selectedWork } from '../../data/profile'
import Chip from '../ui/Chip'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function FullStackWorkCard({ project }) {
  return (
    <article className="surface-soft surface-hover flex h-full flex-col lg:col-span-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {project.company}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
            {project.badge && <Chip accent>{project.badge}</Chip>}
          </div>
        </div>
        {project.period ? (
          <p className="shrink-0 font-mono text-[11px] text-mute">{project.period}</p>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-mute">{project.useCase}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{project.contribution}</p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Frontend
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-mute">{project.frontendContribution}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.frontendStack.map((item) => (
              <li key={item}>
                <Chip accent>{item}</Chip>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
            {project.backendExposureLabel}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            Hands-on backend contribution — practical exposure, not production backend ownership.
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.backendStack.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <details className="mt-5 group">
        <summary className="cursor-pointer text-sm text-mute transition hover:text-ink">
          Backend concepts worked on
        </summary>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.backendExposure.map((item) => (
            <li key={item}>
              <Chip>{item}</Chip>
            </li>
          ))}
        </ul>
      </details>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Technology stack">
        {project.stack.map((item) => (
          <li key={item}>
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>
    </article>
  )
}

function ProductionWorkCard({ project }) {
  return (
    <article className="surface-soft surface-hover flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {project.company}
          </p>
          <h3 className="mt-1.5 text-lg font-semibold text-ink">{project.name}</h3>
        </div>
        <p className="shrink-0 font-mono text-[11px] text-mute">{project.period}</p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-mute">{project.useCase}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{project.contribution}</p>

      <ul className="mt-4 space-y-1.5 text-sm text-mute">
        {project.features.map((feature) => (
          <li key={feature} className="relative pl-4">
            <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Technology stack">
        {project.stack.map((item) => (
          <li key={item}>
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Work() {
  return (
    <section id="work" className="section-shell section-shell--muted">
      <Reveal>
        <SectionHeading
          eyebrow="Work"
          title="Production projects"
          description="Applications built for real business workflows — dashboards, CMS sites, web-views, and operational portals."
        />
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {selectedWork.map((project) => (
          <Reveal key={project.id} className={project.variant === 'fullstack' ? 'lg:col-span-2' : ''}>
            {project.variant === 'fullstack' ? (
              <FullStackWorkCard project={project} />
            ) : (
              <ProductionWorkCard project={project} />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
