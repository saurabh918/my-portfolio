import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { HiOutlineChatAlt2, HiOutlineX } from 'react-icons/hi'
import { answerFromPortfolio, suggestedQuestions } from '../../data/assistant'

const BASE_INSET = 16

const INITIAL_MESSAGE = {
  id: 0,
  role: 'assistant',
  text: 'Ask about experience, React/Next.js work, skills, or contact details. Answers come from this portfolio and resume only — not a live language model.',
  animate: false,
}

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduceMotion
}

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [panelMounted, setPanelMounted] = useState(false)
  const [panelVisible, setPanelVisible] = useState(false)
  const [bottomInset, setBottomInset] = useState(BASE_INSET)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  const nextMessageId = useRef(1)
  const titleId = useId()
  const reduceMotion = usePrefersReducedMotion()

  const openAssistant = useCallback(() => {
    setOpen(true)
  }, [])

  const closeAssistant = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (open) {
      setPanelMounted(true)

      if (reduceMotion) {
        setPanelVisible(true)
        return undefined
      }

      setPanelVisible(false)
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelVisible(true))
      })
      return () => cancelAnimationFrame(frame)
    }

    setPanelVisible(false)
    return undefined
  }, [open, reduceMotion])

  useEffect(() => {
    if (open && panelVisible && panelMounted) {
      inputRef.current?.focus({ preventScroll: true })
    }
  }, [open, panelVisible, panelMounted])

  useEffect(() => {
    if (!open && reduceMotion && panelMounted) {
      setPanelMounted(false)
      toggleRef.current?.focus({ preventScroll: true })
    }
  }, [open, reduceMotion, panelMounted])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [messages, panelVisible, reduceMotion])

  useEffect(() => {
    if (!panelMounted) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeAssistant()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panelMounted, closeAssistant])

  useEffect(() => {
    if (!panelMounted || !panelRef.current) return undefined

    const panel = panelRef.current
    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return

      const focusable = [...panel.querySelectorAll(focusableSelector)]
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    panel.addEventListener('keydown', onKeyDown)
    return () => panel.removeEventListener('keydown', onKeyDown)
  }, [panelMounted])

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
  }, [panelMounted])

  const handlePanelTransitionEnd = (event) => {
    if (event.currentTarget !== event.target) return
    if (event.propertyName !== 'opacity') return

    if (!open) {
      setPanelMounted(false)
      toggleRef.current?.focus({ preventScroll: true })
    }
  }

  const ask = (question) => {
    const trimmed = question.trim()
    if (!trimmed) return

    const result = answerFromPortfolio(trimmed)
    const userId = nextMessageId.current
    const assistantId = nextMessageId.current + 1
    nextMessageId.current += 2

    setMessages((current) => [
      ...current,
      { id: userId, role: 'user', text: trimmed, animate: true },
      { id: assistantId, role: 'assistant', text: result.text, animate: true },
    ])
    setInput('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    ask(input)
  }

  const panelClassName = [
    'assistant-panel flex w-full max-h-[min(600px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-xl border border-line-strong bg-surface shadow-assistant',
    panelVisible ? 'is-open' : 'is-closing',
  ].join(' ')

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[100] flex justify-end px-4 sm:px-5 md:px-6"
      style={{ bottom: bottomInset }}
    >
      <div className="pointer-events-auto flex w-full max-w-[26rem] flex-col items-end gap-3">
        {panelMounted ? (
          <section
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={panelClassName}
            style={{ backgroundColor: '#141820' }}
            onTransitionEnd={handlePanelTransitionEnd}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3">
              <div>
                <h2 id={titleId} className="text-sm font-semibold text-ink">
                  Ask about my work
                </h2>
                <p className="text-xs text-mute">Resume-backed answers</p>
              </div>
              <button
                type="button"
                onClick={closeAssistant}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-mute transition-colors hover:bg-surface-raised hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98]"
                aria-label="Close assistant"
              >
                <HiOutlineX size={18} />
              </button>
            </header>

            <div
              ref={listRef}
              role="log"
              aria-live="polite"
              aria-relevant="additions"
              aria-label="Conversation"
              className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3"
            >
              {messages.map((message) => (
                <p
                  key={message.id}
                  className={`rounded-lg px-3 py-2.5 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'ml-8 bg-surface-raised text-ink'
                      : 'mr-6 bg-page-muted text-mute'
                  } ${message.animate ? 'assistant-message-enter' : ''}`}
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
                    className="rounded-md bg-surface-raised px-2.5 py-1 text-left text-[11px] text-mute transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98]"
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
                className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-page-muted px-3 text-sm text-ink placeholder:text-mute focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                style={{ backgroundColor: '#0f1218' }}
              />
              <button type="submit" className="btn-primary h-10 shrink-0 px-4 active:scale-[0.98]">
                Ask
              </button>
            </form>
          </section>
        ) : null}

        {!open ? (
          <button
            ref={toggleRef}
            type="button"
            onClick={openAssistant}
            className="assistant-toggle inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm font-medium text-ink shadow-soft"
            style={{ backgroundColor: '#141820' }}
            aria-expanded={open}
            aria-controls={titleId}
            aria-haspopup="dialog"
            aria-label="Open work assistant"
          >
            <HiOutlineChatAlt2 size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Ask about my work</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}
