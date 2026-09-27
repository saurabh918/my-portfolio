export const MATCH_THRESHOLD = 2

export const INTENT_TOPICS = [
  {
    id: 'experience',
    questions: [
      "What is Saurabh's experience?",
      'How many years of experience does he have?',
    ],
    keywords: ['experience', 'years', 'background', 'seniority', 'career', 'professional'],
  },
  {
    id: 'current-role',
    questions: ['Tell me about his current role.', 'Where does he work now?'],
    keywords: ['current', 'present', 't7e', 'aftermarket', 'now', 'latest', 'role'],
  },
  {
    id: 'previous-roles',
    questions: ['What companies has he worked at?', 'Tell me about his previous roles.'],
    keywords: ['previous', 'axioned', 'v2s', 'v2stech', 'companies', 'employer', 'history', 'worked'],
  },
  {
    id: 'react',
    questions: ['What React projects has he worked on?', 'What kind of frontend work has he done?'],
    keywords: ['react', 'frontend', 'next', 'dashboard', 'projects', 'work', 'built', 'applications'],
  },
  {
    id: 'skills',
    questions: ['What technologies does he know?', 'What is his tech stack?'],
    keywords: ['technolog', 'skills', 'stack', 'tools', 'typescript', 'redux', 'css', 'know'],
  },
  {
    id: 'nextjs',
    questions: ['Does he have Next.js experience?'],
    keywords: ['next.js', 'nextjs', 'next js', 'strapi', 'cms'],
  },
  {
    id: 'contact',
    questions: ['How can I contact him?', 'What is his email?'],
    keywords: ['contact', 'email', 'linkedin', 'github', 'reach', 'phone', 'hire'],
  },
  {
    id: 'education',
    questions: ['What is his education?'],
    keywords: ['education', 'degree', 'university', 'college', 'bachelor', 'be'],
  },
  {
    id: 'resume',
    questions: ['Where can I get his resume?'],
    keywords: ['resume', 'cv', 'curriculum'],
  },
]

function tokenize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1)
}

function scoreQuestionAgainstTopics(raw, tokens) {
  let best = null
  let bestScore = 0

  INTENT_TOPICS.forEach((entry) => {
    let score = 0
    entry.keywords.forEach((keyword) => {
      if (raw.toLowerCase().includes(keyword)) score += 3
    })
    tokens.forEach((token) => {
      if (entry.keywords.some((keyword) => keyword.includes(token) || token.includes(keyword))) {
        score += 1
      }
    })
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  })

  return { best, bestScore }
}

/**
 * Classifies a user question against predefined portfolio intents.
 * @returns {{ intent: string, score: number }}
 */
export function classifyIntent(question) {
  const raw = question.trim()

  if (!raw) {
    return { intent: 'general', score: 0 }
  }

  const tokens = tokenize(raw)
  const { best, bestScore } = scoreQuestionAgainstTopics(raw, tokens)

  if (!best || bestScore < MATCH_THRESHOLD) {
    return { intent: 'general', score: bestScore }
  }

  return { intent: best.id, score: bestScore }
}
