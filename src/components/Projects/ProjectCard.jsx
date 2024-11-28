import React, { useState } from 'react'

const ProjectCard = ({ title ,main, logo, demoLink, codeLink }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Conditionally display 200 characters or the full text
  const textToShow = isExpanded ? main : `${main.slice(0, 200)}...`;

  return (
    <div className='p-3 md:py-6 md:px-3 flex md:basis-[45%] xlg:basis-[18%] flex-col w-80 bg-[#0c0e19] shadow-xl shadow-slate-900 rounded-2xl'>
      <img className='p-4' src={logo} alt="Banner" loading='lazy' />
      <h3 className='px-4 text-xl md:text-2xl font-bold leading-normal'>
        {title}
      </h3>
      <p className='px-4 text-sm md:text-md leading-tight py-2'>
        {textToShow}
        {main.length > 200 && (
          <span
            onClick={toggleReadMore}
            className='text-blue-500 cursor-pointer'>
            {isExpanded ? ' Show less' : ' Read more'}
          </span>
        )}
      </p>
      <div className='p-2 flex gap-2 md:gap-4'>
        <a href={demoLink} target='_blank' rel='noopener noreferrer' >
        <button className='md:mt-10 text-white py-2 px-3 text-[13px] md:py-2 md:px-4 hover:opacity-85 duration-300 hover:scale-105 font-semibold rounded-3xl bg-[#465697]'>
          Demo
        </button>
        </a>
        <a href={codeLink} target='_blank' rel='noopener noreferrer' >
        <button className='md:mt-10 text-white py-2 px-3 text-[13px] md:py-2 md:px-4 hover:opacity-85 duration-300 hover:scale-105 font-semibold rounded-3xl bg-[#465697]'>
          Source code
        </button>
        </a>
      </div>
    </div>
  )
}

export default ProjectCard