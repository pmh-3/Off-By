import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
import LeaderBoard from "./LeaderBoard"


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
      <h1>Average Score: {score}%</h1>
      {screen}
      <LeaderBoard  score = {dum} handleAdd = {handleAdd}/>
      <button onClick={() => history.push("/Quiz")}>Play Again</button>   
      <button onClick={() => history.push("/")}>Home</button>
    </>
  )
}

export default Score;
