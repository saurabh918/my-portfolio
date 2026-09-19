import { profile, experience, selectedWork, personalProjects, education } from './profile'

const companyList = experience.map((item) => item.company).join(', ')
const productionNames = selectedWork.map((item) => item.name).join('; ')
const personalNames = personalProjects.map((item) => item.name).join(', ')

const answers = [
  {
    id: 'experience',
    questions: [
      "What is Saurabh's experience?",
      'How many years of experience does he have?',
    ],
    keywords: ['experience', 'years', 'background', 'seniority', 'career', 'professional'],
    answer: `${profile.name} is a ${profile.title} with ${profile.experienceYears} years of professional experience building enterprise web applications with React.js, Next.js, TypeScript, Redux, and related frontend technologies. His work covers dashboards, CMS-driven websites, mobile web-view platforms, REST API integrations, and production delivery.`,
  },
  {
    id: 'current-role',
    questions: ['Tell me about his current role.', 'Where does he work now?'],
    keywords: ['current', 'present', 't7e', 'aftermarket', 'now', 'latest', 'role'],
    answer: `He is currently a Frontend Developer at T7E Aftermarket Connect Pvt. Ltd. (Sep 2024 – Present). He has led frontend work on loyalty and workforce-management dashboards, mobile web-view campaign experiences, a Next.js + Strapi company website, and platform modernization including a Node.js 14 to 22 migration with Jenkins, Docker, and AWS-hosted environments.`,
  },
  {
    id: 'previous-roles',
    questions: ['What companies has he worked at?', 'Tell me about his previous roles.'],
    keywords: ['previous', 'axioned', 'v2s', 'v2stech', 'companies', 'employer', 'history', 'worked'],
    answer: `His experience includes ${companyList}. Before T7E, he was a Software Engineer at V2STech Solutions (May 2024 – Aug 2024) on a healthcare benefits portal, and a Software Engineer at Axioned (Jan 2022 – Mar 2024) working on React dashboards, a Shopify integration, and JAMstack websites.`,
  },
  {
    id: 'react',
    questions: ['What React projects has he worked on?', 'What kind of frontend work has he done?'],
    keywords: ['react', 'frontend', 'next', 'dashboard', 'projects', 'work', 'built', 'applications'],
    answer: `His production React/Next.js work includes: ${productionNames}. He also maintains personal React projects such as ${personalNames}. Day to day this means reusable components, responsive UI, REST API integration, and dashboard or CMS-driven interfaces.`,
  },
  {
    id: 'skills',
    questions: ['What technologies does he know?', 'What is his tech stack?'],
    keywords: ['technolog', 'skills', 'stack', 'tools', 'typescript', 'redux', 'css', 'know'],
    answer: `Primary frontend: React.js, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Redux, Tailwind CSS. Supporting backend exposure from hands-on project work: Node.js, Express.js, REST APIs, Authentication, MySQL, and Sequelize. Also: React Context API, TanStack Query, SCSS, Material UI, Styled Components, Strapi, JAMstack/Eleventy, Shopify, Git, Netlify, Docker, AWS, and Jenkins.`,
  },
  {
    id: 'nextjs',
    questions: ['Does he have Next.js experience?'],
    keywords: ['next.js', 'nextjs', 'next js', 'strapi', 'cms'],
    answer: `Yes. At T7E he developed reusable React and Next.js components, and designed the company website in Next.js with Strapi CMS — including reusable templates, responsive layouts, SEO-friendly architecture, and CMS-driven content workflows.`,
  },
  {
    id: 'contact',
    questions: ['How can I contact him?', 'What is his email?'],
    keywords: ['contact', 'email', 'linkedin', 'github', 'reach', 'phone', 'hire'],
    answer: `Email: ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}. Location: ${profile.location}. A resume download is available on this site.`,
  },
  {
    id: 'education',
    questions: ['What is his education?'],
    keywords: ['education', 'degree', 'university', 'college', 'bachelor', 'be'],
    answer: `${education.degree} from ${education.school}, ${education.year}.`,
  },
  {
    id: 'resume',
    questions: ['Where can I get his resume?'],
    keywords: ['resume', 'cv', 'curriculum'],
    answer: `You can download his resume from the Resume button in the header or the contact section. Direct file: ${profile.resumeHref}.`,
  },
]

function tokenize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1)
}

export const suggestedQuestions = answers.map((item) => item.questions[0])

export function answerFromPortfolio(question) {
  const raw = question.trim()
  if (!raw) {
    return {
      text: 'Ask about experience, React/Next.js work, skills, roles, or how to get in touch. Answers stay limited to this portfolio and resume.',
      matched: false,
    }
  }

  const tokens = tokenize(raw)
  let best = null
  let bestScore = 0

  answers.forEach((entry) => {
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

  if (!best || bestScore < 2) {
    return {
      text: `I can answer using ${profile.name}'s resume and this site only. Try asking about his current role, React/Next.js work, skills, education, or contact details.`,
      matched: false,
    }
  }

  return { text: best.answer, matched: true }
}

