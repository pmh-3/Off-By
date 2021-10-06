import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import TodoList from './TodoList'
import Page from './Page'
import Home from './Home';
import Quiz from './Quiz';
import Score from './Score';
import Slider from './InputSlider';

const LOCALSTORAGE = 'todApp.todos'

function App() {

  const [score, setScore] = useState(100);

  const handleScore = (avg) => {
      setScore(parseInt(avg))
  }
  
  return (
  <>

  <Router>
  <Route path="/" exact render={() => <Home />} />
  <Route path="/Slider" render={() => <Slider />} />
  <Route path="/Quiz" render={() => <Quiz handleScore ={handleScore} />} />
  <Route path="/Score" render={() => <Score Xscore ={score} />} />
  </Router>
  </>
  )
}

export default App;
