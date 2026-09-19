import { personalProjects } from '../../data/profile'
import Chip from '../ui/Chip'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow="Personal"
          title="Personal projects"
          description="Smaller React applications for state management, UI composition, and client-side workflows."
        />
      </Reveal>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {personalProjects.map((project) => (
          <Reveal key={project.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-surface shadow-soft transition hover:bg-surface-raised">
              <div className="overflow-hidden">
                <img
                  src={project.logo}
                  alt={project.alt}
                  className="h-40 w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-ink">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{project.description}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((item) => (
                    <li key={item}>
                      <Chip>{item}</Chip>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex gap-4 pt-4">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent text-sm"
                  >
                    Live demo
                    <span className="sr-only"> for {project.name}</span>
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-mute transition hover:text-ink"
                  >
                    Source
                    <span className="sr-only"> for {project.name}</span>
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
