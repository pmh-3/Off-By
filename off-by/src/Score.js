import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";

function Score({score}) {
  const history = useHistory();

  return (
    <>
    <h1>Average Score: {score}%</h1>
      <h2>Congragulations you are an Honorary Otter</h2>
      <button onClick={() => history.push("/Quiz")}>Play Again</button>
      <>                    </>
      <button onClick={() => history.push("/")}>Home</button>

    </>
  )
}

export default Score;
