export default function SectionHeading({ eyebrow, title, description, align = 'left', wide = false }) {
  const widthClass = wide ? '' : align === 'center' ? 'mx-auto max-w-prose text-center' : 'max-w-prose'

  return (
    <div className={widthClass}>
      {eyebrow ? (
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-mute md:text-[17px]">
          {description}
        </p>
      ) : null}
    </div>
  )
}
