import {
  profile,
  personalProjects,
  education,
  skillGroups,
  isT7ECurrentEmployer,
  getT7EEmploymentEndDateLabel,
  getT7EDateRange,
  getExperience,
  getSelectedWork,
  T7E_ROLE_HIGHLIGHTS,
} from './profile'
import { classifyIntent, INTENT_TOPICS, MATCH_THRESHOLD } from './intentClassification'

function buildCurrentRoleAnswer(referenceDate = new Date()) {
  const dateRange = getT7EDateRange(referenceDate)

  if (isT7ECurrentEmployer(referenceDate)) {
    return `He is currently a Frontend Developer at T7E Aftermarket Connect Pvt. Ltd. (${dateRange}). ${T7E_ROLE_HIGHLIGHTS}`
  }

  return `He previously worked as a Frontend Developer at T7E Aftermarket Connect Pvt. Ltd. (${dateRange}). His last day at T7E was ${getT7EEmploymentEndDateLabel()}. ${T7E_ROLE_HIGHLIGHTS}`
}

function buildPreviousRolesAnswer(referenceDate = new Date()) {
  const companyList = getExperience(referenceDate)
    .map((item) => item.company)
    .join(', ')

  if (isT7ECurrentEmployer(referenceDate)) {
    return `His experience includes ${companyList}. Before T7E, he was a Software Engineer at V2STech Solutions (May 2024 – Aug 2024) on a healthcare benefits portal, and a Software Engineer at Axioned (Jan 2022 – Mar 2024) working on React dashboards, a Shopify integration, and JAMstack websites.`
  }

  return `His experience includes ${companyList}. He previously worked at T7E Aftermarket Connect Pvt. Ltd. (${getT7EDateRange(referenceDate)}) as a Frontend Developer. Before T7E, he was a Software Engineer at V2STech Solutions (May 2024 – Aug 2024) on a healthcare benefits portal, and a Software Engineer at Axioned (Jan 2022 – Mar 2024) working on React dashboards, a Shopify integration, and JAMstack websites.`
}

const ANSWER_BUILDERS = {
  experience: () =>
    `${profile.name} is a ${profile.title} with ${profile.experienceYears} years of professional experience building enterprise web applications with React.js, Next.js, TypeScript, Redux, and related frontend technologies. His work covers dashboards, CMS-driven websites, mobile web-view platforms, REST API integrations, and production delivery.`,
  'current-role': (referenceDate) => buildCurrentRoleAnswer(referenceDate),
  'previous-roles': (referenceDate) => buildPreviousRolesAnswer(referenceDate),
  react: (referenceDate) => {
    const productionNames = getSelectedWork(referenceDate)
      .map((item) => item.name)
      .join('; ')
    const personalNames = personalProjects.map((item) => item.name).join(', ')
    return `His production React/Next.js work includes: ${productionNames}. He also maintains personal React projects such as ${personalNames}. Day to day this means reusable components, responsive UI, REST API integration, and dashboard or CMS-driven interfaces.`
  },
  skills: () =>
    skillGroups
      .map((group) => `${group.name}: ${group.items.join(', ')}.`)
      .join(' '),
  nextjs: () =>
    `Yes. At T7E he developed reusable React and Next.js components, and designed the company website in Next.js with Strapi CMS — including reusable templates, responsive layouts, SEO-friendly architecture, and CMS-driven content workflows.`,
  contact: () =>
    `Email: ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}. Location: ${profile.location}. A resume download is available on this site.`,
  education: () => `${education.degree} from ${education.school}, ${education.year}.`,
  resume: () =>
    `You can download his resume from the Resume button in the header or the contact section. Direct file: ${profile.resumeHref}.`,
}

function buildAnswers(referenceDate = new Date()) {
  return INTENT_TOPICS.map((topic) => ({
    id: topic.id,
    questions: topic.questions,
    keywords: topic.keywords,
    answer: ANSWER_BUILDERS[topic.id](referenceDate),
  }))
}

export { classifyIntent } from './intentClassification'

export const suggestedQuestions = INTENT_TOPICS.map((item) => item.questions[0])

function buildFallbackText(referenceDate = new Date()) {
  if (isT7ECurrentEmployer(referenceDate)) {
    return `I can answer using ${profile.name}'s resume and this site only. Try asking about his current role, React/Next.js work, skills, education, or contact details.`
  }

  return `I can answer using ${profile.name}'s resume and this site only. Try asking about his most recent role, React/Next.js work, skills, education, or contact details.`
}

export function answerFromPortfolio(question, referenceDate = new Date()) {
  const raw = question.trim()
  if (!raw) {
    return {
      text: 'Ask about experience, React/Next.js work, skills, roles, or how to get in touch. Answers stay limited to this portfolio and resume.',
      matched: false,
    }
  }

  const { intent, score } = classifyIntent(raw)

  if (score < MATCH_THRESHOLD) {
    return {
      text: buildFallbackText(referenceDate),
      matched: false,
    }
  }

  const answers = buildAnswers(referenceDate)
  const matched = answers.find((entry) => entry.id === intent)

  if (!matched) {
    return {
      text: buildFallbackText(referenceDate),
      matched: false,
    }
  }

  return { text: matched.answer, matched: true }
}
