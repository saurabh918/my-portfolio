import { useEffect, useId, useRef, useState } from 'react'
import { HiOutlineChatAlt2, HiOutlineX } from 'react-icons/hi'
import { answerFromPortfolio, suggestedQuestions } from '../../data/assistant'

const BASE_INSET = 16

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [bottomInset, setBottomInset] = useState(BASE_INSET)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Ask about experience, React/Next.js work, skills, or contact details. Answers come from this portfolio and resume only — not a live language model.',
    },
  ])
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const updatePosition = () => {
      const footer = document.getElementById('site-footer')
      if (!footer) {
        setBottomInset(BASE_INSET)
        return
      }

      const rect = footer.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      if (rect.top < viewportHeight) {
        setBottomInset(Math.max(BASE_INSET, viewportHeight - rect.top + BASE_INSET))
      } else {
        setBottomInset(BASE_INSET)
      }
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open])

  const ask = (question) => {
    const trimmed = question.trim()
    if (!trimmed) return
    const result = answerFromPortfolio(trimmed)
    setMessages((current) => [
      ...current,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: result.text },
    ])
    setInput('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    ask(input)
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[100] flex justify-end px-4 sm:px-5 md:px-6"
      style={{ bottom: bottomInset }}
      aria-live="polite"
    >
      <div className="pointer-events-auto flex w-full max-w-[26rem] flex-col items-end gap-3">
        {open ? (
          <section
            aria-labelledby={titleId}
            className="flex w-full max-h-[min(600px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-xl border border-line-strong bg-surface shadow-assistant"
            style={{ backgroundColor: '#141820' }}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3">
              <div>
                <h2 id={titleId} className="text-sm font-semibold text-ink">
                  Ask about this work
                </h2>
                <p className="text-xs text-mute">Resume-backed answers</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-mute transition hover:bg-surface-raised hover:text-ink"
                aria-label="Close assistant"
              >
                <HiOutlineX size={18} />
              </button>
            </header>

            <div
              ref={listRef}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3"
            >
              {messages.map((message, index) => (
                <p
                  key={`${message.role}-${index}`}
                  className={`rounded-lg px-3 py-2.5 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'ml-8 bg-surface-raised text-ink'
                      : 'mr-6 bg-page-muted text-mute'
                  }`}
                  style={{
                    backgroundColor: message.role === 'user' ? '#1a1f2a' : '#0f1218',
                  }}
                >
                  {message.text}
                </p>
              ))}
            </div>

            <div className="shrink-0 border-t border-line px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 3).map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => ask(question)}
                    className="rounded-md bg-surface-raised px-2.5 py-1 text-left text-[11px] text-mute transition hover:text-ink"
                    style={{ backgroundColor: '#1a1f2a' }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="flex shrink-0 gap-2 border-t border-line p-3"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Question about Saurabh’s work
              </label>
              <input
                id="assistant-input"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question"
                className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-page-muted px-3 text-sm text-ink placeholder:text-mute"
                style={{ backgroundColor: '#0f1218' }}
              />
              <button type="submit" className="btn-primary h-10 shrink-0 px-4">
                Ask
              </button>
            </form>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm font-medium text-ink shadow-soft transition hover:bg-surface-raised"
          style={{ backgroundColor: '#141820' }}
          aria-expanded={open}
          aria-controls={open ? titleId : undefined}
          aria-label={open ? 'Close work assistant' : 'Open work assistant'}
        >
          <HiOutlineChatAlt2 size={17} aria-hidden="true" />
          <span className="hidden sm:inline">Ask about this work</span>
        </button>
      </div>
    </div>
  )
}
