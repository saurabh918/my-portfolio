import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'
import { profile } from '../../data/profile'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const contacts = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: FiMail,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/saurabh-gaonkar-2b12841b7',
    href: profile.linkedin,
    icon: FiLinkedin,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/saurabh918',
    href: profile.github,
    icon: FiGithub,
    external: true,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    icon: FiPhone,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-shell section-shell--surface pb-20 md:pb-24">
      <Reveal>
        <div className="max-w-prose">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s talk about frontend work"
            description="For roles, collaborations, or questions about the work above, email is the fastest route."
          />
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
          {contacts.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-lg bg-surface px-4 py-3.5 transition hover:bg-surface-raised"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-raised text-accent transition group-hover:text-accent-strong">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-soft group-hover:text-ink">
                      {item.value}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={profile.resumeHref} download className="btn-primary">
            Download resume
          </a>
          <a href={`mailto:${profile.email}`} className="btn-secondary">
            Send email
          </a>
        </div>
      </Reveal>
    </section>
  )
}
