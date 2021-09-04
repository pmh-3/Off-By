import React, {useState, useRef, useEffect} from 'react';
import Quiz from './Quiz';

function Home() {

  return (
    <>
    <div className='title'>
        <div>OFF BY</div>
	</div>
      <a href="/Quiz">
        <button >Play</button>
      </a>
    </>
  )
}

export default Home;
