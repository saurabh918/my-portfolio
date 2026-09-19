import { education } from '../../data/profile'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Education() {
  return (
    <section id="education" className="section-shell">
      <Reveal>
        <SectionHeading eyebrow="Background" title="Education" />
        <div className="mt-8 max-w-prose border-l-2 border-accent/40 pl-5">
          <h3 className="text-lg font-semibold text-ink">{education.degree}</h3>
          <p className="mt-1 text-mute">{education.school}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {education.year}
          </p>
        </div>
      </Reveal>
    </section>
  )
}
