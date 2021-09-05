import React, {useState, useRef, useEffect} from 'react';
import Quiz from './Quiz';
import Slider from './InputSlider';

function Home() {

  return (
    <>
    <div className='title'>
        <div>OFF BY</div>
	  </div>
      <a href="/Slider">
        <button >Play</button>
      </a>
    </>
  )
}

export default Home;
