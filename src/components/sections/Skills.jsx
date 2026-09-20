import { skillGroups } from '../../data/profile'
import Chip from '../ui/Chip'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const primarySkills = [
  'React.js',
  'Next.js',
  'TypeScript',
  'JavaScript (ES6+)',
  'Redux',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
]

const supportingSkills = [
  'Node.js',
  'Express.js',
  'REST APIs',
  'Authentication',
  'MySQL',
  'Sequelize',
]

export default function Skills() {
  return (
    <section id="skills" className="section-shell section-shell--surface">
      <Reveal>
        <SectionHeading
          eyebrow="Stack"
          title="Technical skills"
          description="Frontend is my primary expertise. Backend and database skills reflect hands-on project exposure — supporting full-stack work, not deep backend specialization."
          wide
        />

        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Primary — Frontend
          </p>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Primary frontend technologies">
            {primarySkills.map((item) => (
              <Chip key={item} accent>
                {item}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
            Supporting — Backend &amp; database
          </p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            aria-label="Supporting backend and database technologies"
          >
            {supportingSkills.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Reveal key={group.name}>
            <div>
              <h3
                className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                  group.name === 'Frontend' ? 'text-accent' : 'text-mute'
                }`}
              >
                {group.name}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <Chip accent={group.name === 'Frontend'}>{item}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
