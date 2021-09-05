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
  
  return (
  <>
  <div>
  <Router>
  <Route path="/" exact render={() => <Home />} />
  <Route path="/Slider" render={() => <Slider />} />
  <Route path="/Score" render={() => <Score />} />
  </Router>
  </div>
  </>
  )
}

export default App;
