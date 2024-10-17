import React from 'react'
import { CiLinkedin } from 'react-icons/ci'
import { FaGithub } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'

const Footer = () => {
  return (
    <div 
      id='Contact' 
      className='flex flex-col md:flex-row justify-start md:gap-20 text-white p-8 pt-0 md:py-8 md:px-20 items-center'
    >
      <div className='text-center md:text-left mb-6 md:mb-0'>
        <h1 className='text-3xl md:text-5xl font-extrabold mb-2'>Contact</h1>
        <h3 className='text-md md:text-xl font-light'>Feel free to reach out</h3>
      </div>
      <ul className='space-y-4 md:space-y-6 text-center md:text-left'>
        <li className='flex justify-center md:justify-start gap-2 items-center transition transform hover:scale-105'>
          <MdOutlineEmail size={25} />
          <a href="mailto:ssgaonkar96@gmail.com" className='text-sm md:text-lg hover:underline'>
            ssgaonkar96@gmail.com
          </a>
        </li>
        <li className='flex justify-center md:justify-start gap-2 items-center transition transform hover:scale-105'>
          <CiLinkedin size={25} />
          <a href="https://linkedin.com/username" target="_blank" rel="noopener noreferrer" className='text-sm md:text-lg hover:underline'>
            linkedin.com/username
          </a>
        </li>
        <li className='flex justify-center md:justify-start gap-2 items-center transition transform hover:scale-105'>
          <FaGithub size={25} />
          <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className='text-sm md:text-lg hover:underline'>
            github.com/username
          </a>
        </li>
      </ul> 
    </div>
  )
}

export default Footer
