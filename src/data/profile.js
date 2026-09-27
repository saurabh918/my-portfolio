import shoppingCartLogo from '../assets/shopping-website.jpg'
import recipeSearchLogo from '../assets/recipe-search.jpg'
import quizAppLogo from '../assets/quiz-app.jpg'
import axionedLogo from '../assets/axioned-logo.png'
import v2sLogo from '../assets/v2s-icon.jfif'
import t7eLogo from '../assets/t7e-logo.png'

export * from './profileContent.js'

import {
  getExperienceRecords,
  getSelectedWork,
  personalProjectEntries,
} from './profileContent.js'

const experienceMediaById = {
  t7e: { logo: t7eLogo, logoAlt: 'T7E logo', logoSurface: 'dark' },
  v2s: { logo: v2sLogo, logoAlt: 'V2STech Solutions logo' },
  axioned: { logo: axionedLogo, logoAlt: 'Axioned logo' },
}

export function getExperience(referenceDate = new Date()) {
  return getExperienceRecords(referenceDate).map((job) => ({
    ...job,
    ...(experienceMediaById[job.id] ?? {}),
  }))
}

const projectLogosById = {
  'quiz-app': quizAppLogo,
  'shopping-cart': shoppingCartLogo,
  'recipe-search': recipeSearchLogo,
}

export const personalProjects = personalProjectEntries.map((project) => ({
  ...project,
  logo: projectLogosById[project.id],
}))

export const experience = getExperience()

export const selectedWork = getSelectedWork()
