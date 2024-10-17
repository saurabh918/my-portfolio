import React, { useEffect, useState } from 'react'

const TextChanger = () => {
  const texts = ["Hi, I'm Saurabh"]
  const [ currentText, setCurrentText ] = useState('')
  const [ endValue, setEndValue] = useState(true)
  const [ isForward,setIsForward ] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(texts[0].substring( 0, endValue))
      if(isForward) {
        setEndValue(prev => prev + 1)
      } else {
        setEndValue(prev => prev - 1)
      }
      if(endValue > texts[0].length + 10) {
        setIsForward(false)
      }

      if(endValue < 2.1) {
        setIsForward(true)
      }
    }, 50)

    return () => clearInterval(interval)
  },[endValue, isForward, texts])


  return (
    <div className='transition ease duration-300'>{currentText}</div>
  )
}

export default TextChanger