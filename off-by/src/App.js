import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Home';
import Quiz from './Quiz';
import Score from './Score';
import Slider from './InputSlider';


function App() {

  const [score, setScore] = useState(100);

  const handleScore = (avg) => {
      setScore(parseInt(avg))
  }

  const resetScore = () =>{
    setScore(100);
  }
  
  return (
  <>
  <Router>
  <Route path="/" exact render={() => <Home />} />
  <Route path="/Slider" render={() => <Slider />} />
  <Route path="/Quiz" render={() => <Quiz handleScore ={handleScore} />} />
  <Route path="/Score" render={() => <Score score ={score} resetScore = {resetScore}/>} />
  </Router>
  </>
  )
}

export default App;
