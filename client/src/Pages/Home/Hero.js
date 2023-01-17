import React from 'react'
import video from '../../Assets/tourVideo.mp4';
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    
    <div className='hero'>
      <video src={video} autoPlay loop muted ></video>

      <div className='content'>
        <h1>Journey</h1>

        <p className='v_Shape'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo sit a animi dicta.
        </p>

        <div className="buttons">
          <Link to='/locations'>View Location</Link>
          
        </div>
      </div>


    </div>
  )
}

export default Hero