import React from 'react'
import avatarImg from '../../assets/my-pic.jpg'
import TextChanger from '../TextChanger'

const Home = () => {
  return (
    <div className='text-white flex flex-col lg:flex-row lg:items-center w-full justify-start gap-x-20 items-start p-10 md:px-20'>
      <div className='lg:w-2/4 xlg:basis-2/5'>
        <h1 className='text-3xl md:text-6xl font-bold flex leading-normal tracking-tighter'>
         <TextChanger />
        </h1>
        <p className='text-sm md:text-2xl md:mt-5 leading-tight tracking-tight'>
        Proficient software developer with a passion for clean code, agile methodologies, and turning ideas into functional, reliable software.
        </p>
      </div>
      <div className='basis-2/5 md:w-[40%] mt-5'>
        <img className='w-2/5 rounded-full' src={avatarImg} alt="Profile" />
      </div>
    </div>
  )
}

export default Home