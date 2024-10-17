import { FaCss3,FaFigma,FaHtml5,FaJs,FaGoogle, FaReact, FaSass, FaWindows, FaUbuntu, FaGithub, FaGitAlt } from 'react-icons/fa'
import {SiFormik, SiJamstack, SiJira, SiMongodb, SiMui, SiNetlify, SiReactquery, SiRedis, SiRedux, SiStyledcomponents, SiTypescript} from 'react-icons/si'
import { DiJqueryLogo } from 'react-icons/di'
import { RiTailwindCssFill } from 'react-icons/ri'
import { VscVscode } from 'react-icons/vsc'
import { v4 as uuidv4 } from 'uuid'

const iconsData = [
  { title: "HTML5", icon: FaHtml5, color: '#E34F26' },
  { title: "CSS3", icon: FaCss3, color: '#1572b6' },
  { title: "SASS", icon: FaSass, color: '#b878e3' },
  { title: "TailwindCSS", icon: RiTailwindCssFill, color: '#34baeb' },
  { title: "Material UI", icon: SiMui, color: '#1572b6' },
  { title: "JavaScript", icon: FaJs, color: '#F7DF1E' },
  { title: "jQuery", icon: DiJqueryLogo, color: '#3679d1' },
  { title: "TypeScript", icon: SiTypescript, color: '#3679d1' },
  { title: "React", icon: FaReact, color: '#61DAFB' },
  { title: "Redux", icon: SiRedux, color: '#9da6fc' },
  { title: "React Query", icon: SiReactquery, color: '#eb4934' },
  { title: "Styled Components", icon: SiStyledcomponents, color: '#dec98e' },
  { title: "Jamstack", icon: SiJamstack, color: '#eb3477' },
  { title: "Formik", icon: SiFormik, color: '#3446eb' },
  { title: "Figma", icon: FaFigma, color: '#47A248' },
  { title: "VSCode", icon: VscVscode, color: '#3480eb' },
  { title: "Windows", icon: FaWindows, color: '#349eeb' },
  { title: "Ubuntu", icon: FaUbuntu, color: '#eb6134' },
  { title: "Jira", icon: SiJira, color: '#348ceb' },
  { title: "GitHub", icon: FaGithub, color: '#ffffff' },
  { title: "Git", icon: FaGitAlt, color: '#eb6734' },
  { title: "Netlify", icon: SiNetlify, color: '#34c6eb' }
];

const IconDisplay = () => {
  return (
    <div className='flex flex-wrap xlg:w-2/5 gap-8 md:p-12 py-10'>
      {
        iconsData.map(item => {
          return (
            <span key={uuidv4()} className='p-3 bg-zinc-950 flex items-center rounded-2xl' title={item.title}>
              <item.icon color={item.color} size={50} />
            </span>
          )
        })
      }      
    </div>
  )
}

export default IconDisplay