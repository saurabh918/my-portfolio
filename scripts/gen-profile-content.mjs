import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const profilePath = path.join(root, 'src/data/profile.js')
const outPath = path.join(root, 'src/data/profileContent.js')

const GENERATED_HEADER = `// Portfolio data for the site and Netlify LLM context (no Vite asset imports).
// Primary copy source: edit this file, or restore monolithic exports in profile.js and run npm run gen:profile-content.
// Client logos: src/data/profile.js

`

function readMonolithicProfileSource() {
  const profileJs = fs.readFileSync(profilePath, 'utf8')

  if (profileJs.includes("export * from './profileContent.js'")) {
    try {
      return execSync('git show HEAD:src/data/profile.js', {
        cwd: root,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      })
    } catch {
      throw new Error(
        'profile.js is a client wrapper and git HEAD profile.js is unavailable. Edit src/data/profileContent.js directly or restore monolithic profile.js.',
      )
    }
  }

  return profileJs
}

function stripLeadingImports(source) {
  let text = source
  while (/^import .+\n/m.test(text)) {
    text = text.replace(/^import .+\n/, '')
  }
  return text
}

function generateProfileContent(source) {
  let output = stripLeadingImports(source)
    .replace(/\n    logo: [^\n]+/g, '')
    .replace(/\n    logoAlt: [^\n]+/g, '')
    .replace(/\n    logoSurface: [^\n]+/g, '')
    .replace(
      'and AWS-hosted environments.',
      'and Docker-based deployment workflows.',
    )
    .replace('export const personalProjects = [', 'export const personalProjectEntries = [')
    .replace('export function getExperience(', 'export function getExperienceRecords(')
    .replace(/\nexport const experience = getExperience\(\)\n/g, '\n')
    .replace(/\nexport const selectedWork = getSelectedWork\(\)\n/g, '\n')

  return GENERATED_HEADER + output.trimStart() + '\n'
}

const source = readMonolithicProfileSource()
const generated = generateProfileContent(source)
fs.writeFileSync(outPath, generated, 'utf8')
console.log('Wrote', path.relative(root, outPath))
