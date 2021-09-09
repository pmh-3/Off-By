import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Quiz from './Quiz';
import Slider from './InputSlider';



function Home() {

  const history = useHistory();
  return (
    <>
    <div className='title'>
        <div>Off By.</div>
        <div>numbers based trivia</div>
        
	  </div>
      <button onClick={() => history.push("/Quiz")}>Play</button>
      <div className='title'>
        <div>%%%%%%%%%%%%%%</div>
        <div>%%%%%%%%%%%%%%</div>
	  </div>
    </>
  )
}

export default Home;
