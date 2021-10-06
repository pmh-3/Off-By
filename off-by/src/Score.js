import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import LeaderBoard from "./LeaderBoard"
import './Score.css';
import otter from './public/sea-otter.png';
import logo from './public/OBlogo.jpg';
import {isMobile} from 'react-device-detect';

var screen = <>empty</>;

function Score({Xscore}) {

  const history = useHistory();
  const [name, setName] = useState();
  const [isAdded, setadded] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isCopied, setCopied] = useState('Share Link');
  const [score, setThisScore] = useState(Xscore);

  useEffect(()=>{
    if(isAdded){
      addLeader().then(setThisScore(100)).then(history.push("/"));
    }      
  },[isAdded])
  

  const setLeader = () => {
    setFlag(true);
    screen = 
    <>
        <div className="add-leader">
            <div id="leader-msg">
                <div></div>
                <div>Congratulations!!</div>
                <div>You are an HONORARY OTTER!</div>
                <strong>Enter your name for the Leaderboard:</strong>
            </div>
            <input
                className= "input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div id="options">
              <div id='option-button' onClick={()=>setadded(true)} >Enter</div>
              <div id='option-button' onClick={()=>history.push("/")} >No Thanks</div>
            </div>
        </div>
    </>;
  }

  const copyLink = () =>{
    var copyText = "offby.io";

    if (isMobile){
      setCopied('share offby.io');
    
    }else{
      // false for not mobile device
     navigator.clipboard.writeText(copyText);

      /* Alert the copied text */
      setCopied('Link Copied');

    }
    /* Copy the text inside the text field */


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
    
    //window.location.reload(false);
}

  return (
    <>
   
    <div className="score-container">
      <div id="score">
        <div>Average Score: {score}%</div>
        <div id="share" onClick={() => copyLink()}>{isCopied}</div>
      </div>
      <div id='lb-box'> 
        <LeaderBoard score={score} setLeader={setLeader}/>
      </div>
      <div id='otter-box'>
        <img id= "otter-image" src={otter} alt="otter"  />
      </div>
      <div id="otter-talk">
        <div id="msg">
          {(flag)? 
              screen
          :
            <div>
              Great Job!!
              <div id="options">
                <div id="option-button" onClick={() => history.push("/Quiz")}>Play Again</div>   
                <div id="option-button" onClick={() => history.push("/")}>Home</div>
              </div>
            </div>   
          }
       </div>
      </div>
    </div>
    </>
  )
}

export default Score;