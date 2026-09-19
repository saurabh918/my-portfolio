export default function Chip({ children, accent = false }) {
  return (
    <span className={accent ? 'chip chip-accent' : 'chip'}>{children}</span>
  )
}
