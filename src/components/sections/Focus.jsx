import { currentFocus } from '../../data/profile'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function Focus() {
  return (
    <section id="focus" className="section-shell section-shell--muted">
      <Reveal>
        <div className="max-w-prose">
          <SectionHeading eyebrow="Practice" title={currentFocus.title} description={currentFocus.body} />
          <ul className="mt-6 space-y-2">
            {currentFocus.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-ink-soft">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
