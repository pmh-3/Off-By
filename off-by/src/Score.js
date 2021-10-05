import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import LeaderBoard from "./LeaderBoard"
import './Score.css';
import otter from './public/sea-otter.png';
import logo from './public/OBlogo.jpg';

var screen = <>empty</>;

function Score({score}) {

  const history = useHistory();
  const [name, setName] = useState();
  const [isAdded, setadded] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isCopied, setCopied] = useState('Share Link');
  const nameRef = useRef();

  const setLeader = () => {
    setFlag(true);
    screen = 
    <>
        <div className="add-leader">
            <div id="leader-msg">
                <strong>Congratulations, honorary otter!!</strong>
              <div>Enter your name for the Leaderboard:</div>
            </div>
            <input
                className= "input"
                type="text"

                onChange={(e) => setName(e.target.value)}
            />
            <div id="options">
              <div id='option-button' onClick={()=>addLeader()} >Enter</div>
              <div id='option-button' onClick={()=>history.push("/")} >No Thanks</div>
            </div>
        </div>
    </>;
  }

  const copyLink = () =>{
    var copyText = "offby.io";

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);

    /* Alert the copied text */
    setCopied('Link Copied');
  }


  const addLeader =  () => {

  var Name = 'ddd';

    const leader = {Name, score};

		fetch('/addLeader', {
			method: 'POST',
			headers: {"Content-Type": "application/json",	},
			body: JSON.stringify(leader)
		})

	}

  /*
  const addLeader = async (e) => {
    var Sendname = {name};
    var sendScore = {score};


    fetch()

    const requestOptions= {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name: "{Sendname}", score: "{sendScore}"})
    };

    fetch('/addLeader', requestOptions);


    //window.location.reload(false);
}
*/

  return (
    <>
    <div className="score-container">
      <div id="score">
        <div>Average Score: {score}% {name}</div>
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

              <div id='congrats'>
              Great Job!!
              </div>
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
