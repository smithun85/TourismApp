import React from 'react'
import Navbar from '../../Components/Navbar/Navbar.js';
import Hero from './Hero.js'
import './HomeStyle.css';

function Home() {
  return (
    <div className='home-section'>
    <Navbar/>
        <Hero/>     
    </div>
  )
}

export default Home