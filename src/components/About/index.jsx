import React from 'react'
import AboutImage from '../../assets/about-me.webp'
import {IoArrowForward} from 'react-icons/io5'

const About = () => {
  return (
    <div id='About' className='text-white bg-black shadow-xl mx-0 md:mx-20 bg-opacity-30 rounded-lg p-12'>
        <h2 className='text-2xl md:text-4xl font-bold'>About me</h2>
        <div className='md:flex flex-wrap gap-14 flex-col md:flex-row items-center py-10'>
          <img className='md:h-80' src={AboutImage} alt="About img" loading='lazy' />

          <ul>
            <div className='flex gap-3 py-4'>
              <IoArrowForward size={30} className='mt-1' />

              <span className='w-96'>
                <h1 className='text-xl md:text-3xl font-semibold leading-normal'>Frontend developer</h1>
                <p className='text-md md:text-xl mt-5 leading-tight'>
                Dedicated Software Engineer with 2+ years of experience in developing web-based applications. Skilled
                in building pages using front-end technologies. Has multi-project experience working with both small and
                large teams. Passionate about creating software solutions that deliver exceptional user experiences and
                committed to working closely with clients to understand their needs and goals.
                </p>
              </span>
            </div>
          </ul>
        </div>
    </div>
  )
}

export default About