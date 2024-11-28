import React from 'react'
import { FaCss3,FaFigma,FaHtml5,FaJs,FaGoogle, FaReact, FaSass, FaWindows, FaUbuntu, FaGithub, FaGitAlt } from 'react-icons/fa'
import {SiFormik, SiJamstack, SiJira, SiMongodb, SiMui, SiNetlify, SiReactquery, SiRedis, SiRedux, SiStyledcomponents, SiTypescript} from 'react-icons/si'
import axionedFallback from '../../assets/axioned-logo.png'
import v2sTechFallback from '../../assets/v2s-icon.jfif'
import { DiJqueryLogo } from 'react-icons/di'
import { RiTailwindCssFill } from 'react-icons/ri'
import { VscVscode } from 'react-icons/vsc'
import IconDisplay from './IconsDisplay'

const Experience = () => {
  return (
    <div id='Experience' className='p-10 md:px-24'>
      <h1 className='text-2xl md:text-4xl text-white font-bold'>Experience</h1>
      <div className='flex flex-col xlg:flex-row flex-wrap items-center justify-around'>
        <IconDisplay />
        <div className='xlg:w-2/5'>
        <div className='flex flex-col md:flex-row gap-10 bg-slate-950 bg-opacity-45 mt-4 rounded-lg p-4 items-center'>
          <div
            className='w-[11%]'
          >
          <img 
            className='w-[100%]'
            src="https://axioned.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F65857%2F1650366368-group-8-1.png&w=64&q=75" 
            alt="Axioned" 
            loading='lazy'
            onError={(e) => {
              console.log('error err')
              e.target.onerror = null;
              e.target.src = axionedFallback;
            }}
          />
          </div>
          <div className='text-white'>
            <h2 className='leading-tight'>Software Engineer, Axioned, Thane</h2>
            <p className='text-sm leading-tight font-thin'>Jan 2022 - March 2024</p>
            <p className='text-sm p-2 text-[#00FFFF]'>Dashboard web application -</p>
            <ul className='text-sm'>
              <li>- Worked with React components, state management, and styling.</li>
              <li>- Implemented data communication with the backend through APIs.</li>
              <li>- Implemented code quality improvements through the use of static code analysis tools, such as
                    SonarQube.</li>
              <li>- Worked on a snippet that serves as a plugin for customers to add to their Shopify stores.</li>
            </ul>
            <p className='text-sm p-2 text-[#00FFFF]'>JAMstack website -</p>
            <ul className='text-sm'>
              <li>- Created/updated pages using JAMstack.</li>
              <li>- Implemented filter, pagination, geolocation-based, and other JavaScript functionalities.</li>
              <li>- Worked on necessary configuration updates on Netlify.</li>
              <li>- Review and merge GitHub pull requests.</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-10 bg-slate-950 bg-opacity-45 mt-4 rounded-lg p-4 items-center'>
          <div className='w-[11%]'>
          <img 
            src="https://media.licdn.com/dms/image/v2/C560BAQEQ7HXmsc2mhA/company-logo_200_200/company-logo_200_200/0/1631302928445?e=1733356800&v=beta&t=qPgVfxFudZEvzmLnaLuR4rZu0j4CN_JaJT7IjyesTLs" 
            className='w-[100%]'
            alt="V2S Tech" 
            loading='lazy'
            onError={(e) => {
              console.log('error err')
              e.target.onerror = null; // Prevents an infinite loop in case the fallback image fails to load
              e.target.src = v2sTechFallback;
            }}
          />
          </div>
          <div className='text-white'>
            <h2 className='leading-tight'>Software Engineer, V2STech Solutions Pvt Ltd, Thane</h2>
            <p className='text-sm leading-tight font-thin'>May 2024 - Aug 2024</p>
            <p className='text-sm p-2 text-[#00FFFF]'>Arogya Yojna web application -</p>
            <ul className='text-sm'>
              <li>- Worked on various modules from scratch.</li>
              <li>- Developed React components, managed state, and applied styling.</li>
              <li>- Created custom components by integrating Styled Components and Material-UI (MUI).</li>
              <li>- Handled form management using Formik and Yup.</li>
              <li>- Implemented data communication with the backend through REST APIs for CRUD
                    operations.</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Experience