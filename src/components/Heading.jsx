import React from 'react'
import useAuth from '../Hooks/useAuth'

const Heading = ({ title, subtitle, extend }) => {
  const { darkMode } = useAuth()
  return (
    <div className='text-center'>
      <p className={`tracking-widest text-base md:text-lg uppercase mb-1 md:mb-2 ${darkMode ? 'text-dark-secondary' : 'text-gray-500'}`}>
        {subtitle}
      </p>
      <h2 className={`uppercase text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 lg:mb-12 tracking-wide leading-[1.1] ${darkMode ? 'text-dark-primary' : 'text-gray-700'}`}>
        {title} <br /> {extend}
      </h2>
    </div>
  )
}

export default Heading