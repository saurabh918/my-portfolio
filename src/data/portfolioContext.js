import { classifyIntent, MATCH_THRESHOLD } from './intentClassification.js'
import {
  profile,
  education,
  skillGroups,
  capabilities,
  personalProjectEntries,
  getExperienceRecords,
  getSelectedWork,
  isT7ECurrentEmployer,
  getT7EDateRange,
  T7E_ROLE_HIGHLIGHTS,
} from './profileContent.js'

const SHOPPING_CART_PROJECT_ID = 'shopping-cart'

function slimExperienceJobs(referenceDate) {
  return getExperienceRecords(referenceDate).map((job) => ({
    company: job.company,
    role: job.role,
    location: job.location,
    start: job.start,
    end: job.end,
    current: job.current,
    technologies: job.technologies,
    projects: job.projects?.map((project) => ({
      name: project.name,
      points: project.points,
    })),
  }))
}

function slimProductionWork(referenceDate) {
  return getSelectedWork(referenceDate).map((item) => ({
    id: item.id,
    name: item.name,
    company: item.company,
    period: item.period,
    variant: item.variant,
    badge: item.badge,
    useCase: item.useCase,
    contribution: item.contribution,
    stack: item.stack,
    frontendStack: item.frontendStack,
    backendStack: item.backendStack,
    backendExposure: item.backendExposure,
    features: item.features,
  }))
}

function slimPersonalProjects() {
  return personalProjectEntries.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    contribution: item.contribution,
    stack: item.stack,
    demoLink: item.demoLink,
    codeLink: item.codeLink,
  }))
}

function getT7EJob(referenceDate) {
  return slimExperienceJobs(referenceDate).find((job) => job.company.includes('T7E')) ?? null
}

function getAiLlmContext() {
  const capability = capabilities.find((item) => item.title === 'AI / LLM integration') ?? null
  const shoppingCart = personalProjectEntries.find((item) => item.id === SHOPPING_CART_PROJECT_ID) ?? null

  return {
    capability,
    personalProject: shoppingCart
      ? {
          id: shoppingCart.id,
          name: shoppingCart.name,
          description: shoppingCart.description,
          contribution: shoppingCart.contribution,
          stack: shoppingCart.stack,
          note:
            'AI functionality is implemented in the separate Shopping Cart application (not in this portfolio site assistant).',
        }
      : null,
    implementedFeatures: [
      'AI Shopping Assistant',
      'LLM integration via Groq / OpenAI-compatible chat completions API',
      'Intent routing',
      'Keyword-based / structured product retrieval',
      'Conversational context / follow-up handling',
      'Server-side Netlify Function for API handling',
      'Server-side API key handling',
    ],
    modelNote:
      'Portfolio copy documents Groq and an OpenAI-compatible API for the Shopping Cart assistant; it does not specify a particular model name—do not invent one.',
  }
}

function getPlatformModernizationProject(referenceDate) {
  const t7e = getT7EJob(referenceDate)
  return (
    t7e?.projects?.find((project) =>
      project.name.toLowerCase().includes('platform modernization'),
    ) ?? null
  )
}

function getAwsExperienceClarification(referenceDate) {
  return {
    directAwsInfrastructureExperience: false,
    summary:
      'No direct AWS infrastructure experience is documented in this portfolio (no AWS cloud architecture or AWS service ownership).',
    relatedDeploymentExperience: {
      tools: ['Docker', 'Jenkins'],
      context: 'T7E Platform Modernization (production work at T7E)',
      activities: [
        'Docker and Jenkins-based deployment workflows',
        'Troubleshooting Docker build issues',
        'Configuring Jenkins pipelines to automate Docker image build and push processes',
      ],
      platformModernizationProject: getPlatformModernizationProject(referenceDate),
    },
    amazonEcrExperience: false,
    doNotClaim: [
      'AWS infrastructure experience',
      'Amazon ECR or other AWS container registry services',
      'AWS networking',
      'Cloud architecture on AWS',
      'AWS ownership',
    ],
    answerInstructions:
      'Answer directly in first person as the portfolio assistant. Do not use the generic portfolio help fallback. For AWS or ECR questions: state no direct AWS infrastructure or Amazon ECR experience, then briefly cite Docker/Jenkins deployment work from relatedDeploymentExperience.',
  }
}

function getGeneralContext(referenceDate) {
  return {
    name: profile.name,
    title: profile.title,
    experienceYears: profile.experienceYears,
    location: profile.location,
    aboutPositioning: profile.aboutPositioning,
    employmentNote: isT7ECurrentEmployer(referenceDate)
      ? 'T7E is listed as current employer in portfolio data for this date.'
      : 'T7E is listed as a previous employer (employment ended September 2026) for this date.',
  }
}

/**
 * Returns structured portfolio context for a given intent (for future LLM grounding).
 * @param {string} intent
 * @param {Date} [referenceDate]
 */
export function buildPortfolioContext(intent, referenceDate = new Date()) {
  switch (intent) {
    case 'experience': {
      const general = getGeneralContext(referenceDate)
      return {
        intent,
        profile: {
          name: profile.name,
          title: profile.title,
          experienceYears: profile.experienceYears,
          summary: profile.summary,
          aboutBrief: profile.aboutBrief,
          aboutPositioning: profile.aboutPositioning,
        },
        employmentNote: general.employmentNote,
        isT7ECurrentEmployer: isT7ECurrentEmployer(referenceDate),
        t7eDateRange: getT7EDateRange(referenceDate),
      }
    }

    case 'current-role': {
      const t7e = getT7EJob(referenceDate)
      const isCurrent = isT7ECurrentEmployer(referenceDate)
      return {
        intent,
        dateRange: getT7EDateRange(referenceDate),
        isCurrentEmployer: isCurrent,
        roleHighlights: T7E_ROLE_HIGHLIGHTS,
        t7e,
        wordingGuidance: isCurrent
          ? 'T7E is the current employer for this reference date; present-tense current-role wording is accurate.'
          : 'T7E is not the current employer (employment ended September 2026). Do not say he currently works at T7E. Use most recent or previous employer wording. Do not invent a new employer after T7E.',
      }
    }

    case 'previous-roles':
      return {
        intent,
        employers: slimExperienceJobs(referenceDate).map((job) => ({
          company: job.company,
          role: job.role,
          start: job.start,
          end: job.end,
          current: job.current,
        })),
      }

    case 'skills':
      return {
        intent,
        positioning:
          'Frontend is primary expertise; backend/database entries reflect hands-on project exposure.',
        skillGroups,
      }

    case 'projects-production':
      return {
        intent,
        productionWork: slimProductionWork(referenceDate),
        note:
          'Order Management System is production work at T7E (not a personal project). Describe it as frontend-first with selected/basic backend contribution — not full backend ownership or backend-specialist experience.',
      }

    case 'projects-personal':
      return {
        intent,
        personalProjects: slimPersonalProjects(),
      }

    case 'react':
      return {
        intent,
        productionWork: slimProductionWork(referenceDate),
        personalProjects: slimPersonalProjects(),
      }

    case 'nextjs': {
      const t7e = getT7EJob(referenceDate)
      const corporateSite = getSelectedWork(referenceDate).find((item) => item.id === 'corporate-site')
      return {
        intent,
        t7eNextJsHighlights: t7e?.projects?.filter((project) =>
          project.name.toLowerCase().includes('website'),
        ),
        productionProject: corporateSite
          ? {
              name: corporateSite.name,
              company: corporateSite.company,
              contribution: corporateSite.contribution,
              stack: corporateSite.stack,
              features: corporateSite.features,
            }
          : null,
      }
    }

    case 'capabilities':
      return {
        intent,
        capabilities,
      }

    case 'education':
      return {
        intent,
        education,
      }

    case 'contact':
      return {
        intent,
        contact: {
          email: profile.email,
          phone: profile.phone,
          linkedin: profile.linkedin,
          github: profile.github,
          location: profile.location,
        },
      }

    case 'resume':
      return {
        intent,
        resumeHref: profile.resumeHref,
        contact: {
          email: profile.email,
          linkedin: profile.linkedin,
          github: profile.github,
        },
        note: 'Resume download is available from the header and contact section.',
      }

    case 'ai-llm':
      return {
        intent,
        ...getAiLlmContext(),
      }

    case 'aws-clarification':
      return {
        intent,
        awsExperienceClarification: getAwsExperienceClarification(referenceDate),
        devOpsToolsFromSkills:
          skillGroups.find((group) => group.name === 'Tools / DevOps')?.items ?? [],
      }

    case 'general':
    default:
      return {
        intent: 'general',
        ...getGeneralContext(referenceDate),
        suggestedTopics: [
          'experience',
          'current-role',
          'skills',
          'projects-production',
          'projects-personal',
          'education',
          'contact',
          'ai-llm',
        ],
      }
  }
}

export function getPortfolioFallbackMessage(referenceDate = new Date()) {
  if (isT7ECurrentEmployer(referenceDate)) {
    return `I can help with questions about ${profile.name}'s experience, skills, projects, education, and portfolio. Try asking about his current role, React/Next.js work, skills, education, or contact details.`
  }

  return `I can help with questions about ${profile.name}'s experience, skills, projects, education, and portfolio. Try asking about his most recent role, React/Next.js work, skills, education, or contact details.`
}

const DEVELOPER_JOKES = [
  'Why do programmers prefer dark mode?\nBecause light attracts bugs. 🐛',
  'Why do Java developers wear glasses?\nBecause they do not C#. 😄',
  'How many programmers does it take to change a light bulb?\nNone — that is a hardware problem.',
  'A SQL query walks into a bar, walks up to two tables, and asks, "Can I join you?"',
  'Why did the developer go broke?\nBecause they used up all their cache. 💸',
]

function pickJoke(message) {
  let hash = 0
  for (let i = 0; i < message.length; i += 1) {
    hash = (hash * 31 + message.charCodeAt(i)) | 0
  }
  const index = Math.abs(hash) % DEVELOPER_JOKES.length
  return DEVELOPER_JOKES[index]
}

const GREETING_REPLY =
  "Hey! 👋 Ask me anything about Saurabh's experience, skills, projects, or just ask me for a joke. 😄"

function isPortfolioScopedMessage(message) {
  const lower = message.toLowerCase()
  if (
    /\b(experience|project|projects|skills|skill|resume|cv|role|worked|saurabh|react|next\.js|nextjs|backend|education|contact|portfolio|employ|technology|technologies|deploy|deployment|docker|jenkins|aws|llm|groq|assistant|shopping cart|order management|t7e|tell me about|current role|your role|email|linkedin|github)\b/i.test(
      lower,
    )
  ) {
    return true
  }
  return /\b(what is your|what are your|who is saurabh|which project|which technology|how does (the|that|it|your)|how did you)\b/i.test(
    lower,
  )
}

function isGreetingMessage(message) {
  const trimmed = message.trim()
  const lower = trimmed.toLowerCase()
  if (isPortfolioScopedMessage(lower)) return false
  if (trimmed.length > 48) return false

  return (
    /^(hi|hello|hey|hiya|howdy)([\s!,.-]*|$)/i.test(lower) ||
    /^good (morning|afternoon|evening)[\s!.?]*$/i.test(lower) ||
    /^(morning|evening)[\s!.?]*$/i.test(lower)
  )
}

function isJokeRequest(message) {
  const lower = message.trim().toLowerCase()
  if (isPortfolioScopedMessage(message)) return false

  if (/^(tell me )?(a )?(funny )?joke[\s!.?]*$/i.test(lower)) return true
  if (/^got a joke[\s!.?]*$/i.test(lower)) return true
  if (/\b(make me laugh|hear a joke)\b/i.test(lower)) return true
  if (/\b(tell me|give me|share)\b/i.test(lower) && /\b(joke|funny)\b/i.test(lower)) return true
  return false
}

function classifyOffTopicKind(message) {
  if (isPortfolioScopedMessage(message)) return null

  const lower = message.toLowerCase()

  if (/\b(weather|forecast|temperature|rain today|snow today|humidity)\b/i.test(lower)) {
    return 'weather'
  }
  if (/\b(capital of|what is the capital|who is the president|prime minister of|today'?s news|headlines|news today)\b/i.test(lower)) {
    return 'general-knowledge'
  }
  if (/\b(tell me a recipe|recipe for|how to cook|ingredients for)\b/i.test(lower)) {
    return 'general-knowledge'
  }
  if (/\b(bitcoin|cryptocurrency|crypto price|stock market|stock price)\b/i.test(lower)) {
    return 'general-knowledge'
  }
  if (
    /\b(math problem|solve for x|what is \d+\s*[+\-*/]\s*\d+|calculate \d+\s*[+\-*/]\s*\d+)\b/i.test(
      lower,
    )
  ) {
    return 'general-knowledge'
  }

  return null
}

function getOffTopicReply(kind) {
  if (kind === 'weather') {
    return "I'm focused on Saurabh's portfolio, experience, skills, and projects, so I can't provide live weather information. You can ask me about his React/Next.js work, AI project, backend experience, or deployment experience instead. 😊"
  }

  return "That's outside my portfolio scope, so I can't help with general-knowledge questions. I can help you with Saurabh's experience, skills, projects, or education."
}

/**
 * Predefined replies for greeting / joke / off-topic (no LLM).
 * @param {{ intent: string, offTopicKind?: string }} routing
 */
export function getAssistantStaticReply(routing, message = '') {
  switch (routing.intent) {
    case 'greeting':
      return GREETING_REPLY
    case 'joke':
      return pickJoke(message)
    case 'off-topic':
      return getOffTopicReply(routing.offTopicKind ?? 'general-knowledge')
    default:
      return null
  }
}

function isAwsInfrastructureQuestion(message) {
  return (
    /\b(aws|amazon web services)\b/i.test(message) ||
    /\becr\b/i.test(message) ||
    /\b(elastic container registry)\b/i.test(message)
  )
}

/** Standalone questions about AI tech (e.g. "for the AI") must not lose to generic skills intent. */
function messageAsksAboutPortfolioAi(message) {
  const lower = message.toLowerCase()
  if (!/\b(ai|llm|groq|assistant)\b/i.test(lower)) return false
  return /\b(technology|technologies|model|models|implement|implemented|work|works|how|what|which|use|used|did you|does it)\b/i.test(
    lower,
  )
}

function deploymentSupplementalIntents(message) {
  const lower = message.toLowerCase()
  if (/\b(docker|jenkins|deploy|deployment)\b/i.test(lower)) {
    return ['current-role']
  }
  return []
}

function conversationTranscript(history, maxMessages = 6) {
  return history
    .slice(-maxMessages)
    .map((entry) => (typeof entry.content === 'string' ? entry.content : ''))
    .join('\n')
}

function historyDiscussesShoppingCartAi(history) {
  if (!history.length) return false
  const text = conversationTranscript(history).toLowerCase()
  return (
    /\bshopping cart\b/i.test(text) ||
    /\bai shopping assistant\b/i.test(text) ||
    (/\bshopping\b/i.test(text) && /\b(ai|llm|groq|assistant)\b/i.test(text))
  )
}

function historyDiscussesReactFocus(history) {
  if (!history.length) return false
  const text = conversationTranscript(history).toLowerCase()
  return /\breact\b/i.test(text) && !historyDiscussesShoppingCartAi(history)
}

function isShoppingCartAiFollowUp(message) {
  const lower = message.toLowerCase()
  if (/\b(ai|llm|groq|assistant|openai|netlify function)\b/i.test(lower)) return true
  if (/\b(model|models|technology|technologies|tech stack|tools)\b/i.test(lower)) return true
  if (/\b(how does|how did|how do|implemented?|works?)\b/i.test(lower)) {
    return /\b(that|it|this|the)\b/i.test(lower)
  }
  if (/\bwhat does (it|that) use\b/i.test(lower)) return true
  return false
}

function isReactTopicFollowUp(message) {
  const lower = message.toLowerCase()
  return (
    /\b(there|that|it|those|this)\b/i.test(lower) &&
    /\b(technology|technologies|tech stack|tools|stack|framework)\b/i.test(lower)
  )
}

export function resolveAssistantIntent(message, history = []) {
  const classification = classifyIntent(message)
  const lower = message.toLowerCase()

  if (isAwsInfrastructureQuestion(message)) {
    return {
      intent: 'aws-clarification',
      score: Math.max(classification.score, MATCH_THRESHOLD),
      useLlm: true,
      supplementalIntents: ['skills'],
    }
  }

  if (/\b(tell me about yourself|about yourself)\b/i.test(lower)) {
    return {
      intent: 'experience',
      score: Math.max(classification.score, MATCH_THRESHOLD),
      useLlm: true,
      supplementalIntents: ['current-role'],
    }
  }

  if (messageAsksAboutPortfolioAi(message)) {
    return {
      intent: 'ai-llm',
      score: Math.max(classification.score, MATCH_THRESHOLD),
      useLlm: true,
      supplementalIntents: ['projects-personal'],
    }
  }

  if (history.length > 0 && historyDiscussesShoppingCartAi(history) && isShoppingCartAiFollowUp(message)) {
    return {
      intent: 'ai-llm',
      score: Math.max(classification.score, MATCH_THRESHOLD),
      useLlm: true,
      supplementalIntents: ['projects-personal'],
    }
  }

  if (history.length > 0 && historyDiscussesReactFocus(history) && isReactTopicFollowUp(message)) {
    return {
      intent: 'react',
      score: Math.max(classification.score, MATCH_THRESHOLD),
      useLlm: true,
      supplementalIntents: ['skills'],
    }
  }

  if (classification.score >= MATCH_THRESHOLD) {
    return {
      ...classification,
      useLlm: true,
      supplementalIntents: deploymentSupplementalIntents(message),
    }
  }

  if (/\b(ai|llm|groq|assistant|shopping cart)\b/i.test(message)) {
    return { intent: 'ai-llm', score: classification.score, useLlm: true, supplementalIntents: [] }
  }

  if (
    history.length > 0 &&
    /\b(which one|which project|that project|uses ai|use ai|about ai)\b/i.test(lower)
  ) {
    return {
      intent: 'ai-llm',
      score: classification.score,
      useLlm: true,
      supplementalIntents: ['projects-personal', 'projects-production'],
    }
  }

  if (history.length > 0 && /\b(which one|that one|those projects|them\b|it\b)\b/i.test(lower)) {
    return {
      intent: 'general',
      score: classification.score,
      useLlm: true,
      supplementalIntents: ['projects-personal', 'projects-production'],
    }
  }

  if (isGreetingMessage(message)) {
    return { intent: 'greeting', score: classification.score, useLlm: false, supplementalIntents: [] }
  }

  if (isJokeRequest(message)) {
    return { intent: 'joke', score: classification.score, useLlm: false, supplementalIntents: [] }
  }

  const offTopicKind = classifyOffTopicKind(message)
  if (offTopicKind) {
    return {
      intent: 'off-topic',
      score: classification.score,
      useLlm: false,
      supplementalIntents: [],
      offTopicKind,
    }
  }

  return { ...classification, intent: 'general', useLlm: false, supplementalIntents: [] }
}
