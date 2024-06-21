import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from './Animation.json'
const Error = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
  return (
    <div className='bg-white h-[1200px] flex justify-center'>
      <Lottie options={defaultOptions} height={300} width={300} className="px-5" />
    </div>
  )
}

export default Error
