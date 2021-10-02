import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import LeaderBoard from "./LeaderBoard"
import './Score.css';
import otter from './public/otter.png';
import logo from './public/OBlogo.jpg';


function Score({score}) {

  const history = useHistory();
  const [name, setName] = useState();
  const [isadded, setadded] = useState(true);
  
  var screen = <></>;

const setLeader = ()=>{
  screen = 
  <>
      <div className="add-leader">
          <p>
              <div></div>
              <div>Congratulations!!</div>
              <div>You are an HONORARY OTTER!</div>
              <strong>Enter your name for the Leaderboard:</strong>
          </p>
          <input
              className= "input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <button onClick={()=>addLeader()} >Enter</button>
          <button onClick={()=>history.push("/")} >No Thanks!</button>
      </div>
  </>
}

  const addLeader = async (e) => {
    const response = await fetch('/addLeader', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: {name}, score: {score},}),
    });
    const body = await response.text();
    console.log(body);
    setadded(true);
    history.push("/");
    //window.location.reload(false);
}

  return (
    <>
    <div className="score-container">
      <div id="score">
        <div>Average Score: {score}%</div>
      </div>
      <div id='lb-box'> 
        <LeaderBoard score={score} setLeader={setLeader}/>
      </div>
      <div id='otter-box'>
        <img id= "otter-image" src={otter} alt="otter"  />
      </div>
      <div id="otter-talk">
        <div id="msg">
          {screen}

          <div>
            Great Job!!
            <div id="options">
              <button onClick={() => history.push("/Quiz")}>Play Again</button>   
              <button onClick={() => history.push("/")}>Home</button>
            </div>
          </div>
      
        </div>
      </div>
    </div>
    </>
  )
}

export default Score;
