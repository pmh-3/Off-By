import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import LeaderBoard from "./LeaderBoard"
import './Score.css';


function Score({score}) {
  const history = useHistory();
  const [dum, setDum] = useState(score);

  var screen = <></>;
  const handleAdd = (dum) => {
    setDum(dum);
    history.push("/");
  }
  
  return (
    <>
    <div className="score-container">
      <div id="score">
        <h1>Average Score: {score}%</h1>
      </div>
      <div id='leaderboard'> 
        <LeaderBoard  score = {dum} handleAdd = {handleAdd}/>
      </div>
      <div id='otter-box'>

      </div>
      <div id="otter-talk">

      </div>
        
        {screen}
        
        <button onClick={() => history.push("/Quiz")}>Play Again</button>   
        <button onClick={() => history.push("/")}>Home</button>

    </div>
    
    </>
  )
}

export default Score;
