import { experience } from '../../data/profile'
import Chip from '../ui/Chip'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          description="Production frontend work across dashboards, CMS platforms, healthcare workflows, and JAMstack delivery."
          wide
        />
      </Reveal>

      <ol className="relative mt-8 w-full max-w-5xl">
        {experience.map((job, index) => (
          <li
            key={job.id}
            className={`relative pl-8 md:pl-10 ${index !== experience.length - 1 ? 'pb-10 md:pb-12' : ''}`}
          >
            <span
              className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {index !== experience.length - 1 ? (
              <span
                className="absolute bottom-0 left-[4px] top-4 w-px bg-line-strong"
                aria-hidden="true"
              />
            ) : null}

            <Reveal>
              <article>
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-x-8">
                  <div className="flex items-start gap-3">
                    {job.logo ? (
                      <img
                        src={job.logo}
                        alt={job.logoAlt}
                        className="mt-0.5 h-9 w-9 rounded-md bg-white object-contain p-0.5"
                      />
                    ) : (
                      <span
                        className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md bg-surface font-mono text-[10px] text-accent"
                        aria-hidden="true"
                      >
                        {job.mark}
                      </span>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{job.role}</h3>
                      <p className="mt-0.5 text-sm text-mute">
                        {job.company}
                        {job.location ? ` · ${job.location}` : ''}
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent sm:text-right">
                    {job.start} — {job.end}
                  </p>
                </div>

                <div className="mt-5 space-y-5">
                  {job.projects.map((project) => (
                    <div key={project.name}>
                      <h4 className="text-sm font-medium text-ink-soft">{project.name}</h4>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-mute">
                        {project.points.map((point) => (
                          <li key={point} className="relative pl-4">
                            <span
                              className="absolute left-0 top-[0.55rem] h-1 w-1 rounded-full bg-line-strong"
                              aria-hidden="true"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${job.company} technologies`}>
                  {job.technologies.map((tech) => (
                    <li key={tech}>
                      <Chip>{tech}</Chip>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
