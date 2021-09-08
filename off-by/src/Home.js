import React, {useState, useRef, useEffect} from 'react';
import Quiz from './Quiz';
import Slider from './InputSlider';

function Home() {

  return (
    <>
    <div className='title'>
        <div>Off By</div>
        <div>%%%%%%%%%</div>
	  </div>
      <a href="/Quiz">
        <button >Play</button>
      </a>
    </>
  )
}

export default Home;