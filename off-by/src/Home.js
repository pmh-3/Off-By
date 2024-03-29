import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Slider from './DemoSlider';
import "./Home.css";
import otter from './public/otter.png';
import SlideOut from './SlideOut';


function Home() {

    //ignore
  const handleGuessChange = (guess) => {}

  const history = useHistory();
  const [isVis, setIsVis] = useState(false);

  const handleSlide = (e)=>{
    toggleSlide();
  }

  const toggleSlide = ()=>{
    var tmp = isVis;
    setIsVis(!tmp);
  }

  return (
    <>
    <div className="container">
      <div id="banner">
        <div>OFF BY</div>
        <div></div> 
        <div id="subheader">% numbers based trivia %</div>   
      </div>

      <div id="slideOut" >
        <div id="slide-button" onClick={handleSlide}>
        Leaderboard
        </div>
        <SlideOut handleSlide={handleSlide} isVis={isVis}/>
      </div>
      <div id="otter">
        <div id="image-cont">
          <img className="otter-image" src={otter} alt="otter"  />
        </div>
        <div id="instructions">    
          <h3></h3>
          <h3>Use the slider to make your best guess </h3>
          <h3>The less you are off by, the better </h3>
          <h3>Play in landscape mode</h3>
          <h3>Beta Version</h3>
        </div>
      </div>
      <div id="play">
          <div className="play-button" onClick={() => history.push("/Quiz")}>     
          </div>        
      </div>
    </div>
    </>
  )
}

export default Home;
