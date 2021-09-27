import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import Quiz from './Quiz';
import Slider from './DemoSlider';
import LeaderBoard from './LeaderBoard';
import Stats from './Stats';
import "./Home.css";
import otter from './otter.png';
import logo from './public/OBlogo.jpg';



function Home() {

  const handleGuessChange = (guess) => {

	}
  const arrows = ">>>";
  const history = useHistory();
  return (
    <>
    <div className="container">
      <div id="banner">
        <div>OFF BY</div>
        <div></div> 
        <div id="subheader">%%%%%%%%%%</div> 
        <div id="subheader">numbers based trivia</div>   
      </div>
      <div id="logo">
        <img src={logo} alt="logo"/>
      </div>
      <div id="leaderboard">
        <LeaderBoard  score = {1000}/></div>
      <div id="otter">
        <img id= "otter-image" src={otter} alt="otter"  />
        <div id="instructions">
          <div id="demo-slider">
            <Slider min = {0} max = {100} units = {"otters"} step= {1} handleGuessChange ={handleGuessChange} />
          </div>      
          <h3></h3>
          <h3>Use the slider to make your best guess </h3>
          <h3>The less you are off by, the better </h3>
        </div>
      </div>
      <div id="play">
          <div className="play-button" onClick={() => history.push("/Quiz")}>     
          </div>        
      </div>
      <div id="stats">
        <div id="stats-title">Stats</div>
        < Stats className="stats" />
      </div>
    </div>
    </>
  )
}

export default Home;
