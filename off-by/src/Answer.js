import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Answer.css';
import Slider from './InputSlider';
import ruler from './Ruler.js';

function Answer({offBy, guess, handleNextQ, question}) {

  return (
    <>
    <div className='answer-container'>
      <div id='score'>
        <h3>Your guess of {guess} was</h3>
        <div className='title'>Off By {offBy} %</div>
        <h3>{question.answerText}</h3>
        <hr id='hzline'></hr>
        <ruler min='0' max='100' guess='20' answer='50' offBy></ruler>
      </div>
      <div id = 'facts'>
        <div className = 'column'>
          <img className = 'image' src={question.image} />
        </div>
        <div className = 'column'>
          <a className ='blurb' style={{ textDecoration: 'none' }} href={question.link} target="_blank">
            {question.blurb}
          </a>
        </div>
      </div> 
    
      <div id = 'info-box'>
        <div id='info'>
        ♦ Contributed by: {question.by}
        </div> 
        <div id='info'>
        ♦ Category: {question.category}
        </div >
        <div id='info'>
        ♦ Source: {question.link}
        </div>
      </div>
        <div id='button-box' onClick={() => handleNextQ()}>        
            <div id="vl"></div>
            <div className="play-button"></div>
        </div>
      </div>
    </>
  )
}

export default Answer;
