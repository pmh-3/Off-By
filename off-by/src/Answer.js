import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Answer.css';
import RuleSlider from './RuleSlider';
import ToLink from './public/ToLink.png';


function Answer({offBy, guess, handleNextQ, question}) {

  return (
    <>
    <div className='answer-container'>
      <div id='a-score'>
        <div className='title'>Off By {offBy} %</div>
        <RuleSlider min={question.min} max={question.max} answer={question.answer} guess={guess} step={question.step}/>
        <h2>{question.answerText}</h2>
      </div>
      
      <div id = 'facts'>
        <div className = 'column'>
          <img className = 'image' src={question.image} />
        </div>
        <div className = 'column'>

          <a className ='blurb' style={{ textDecoration: 'none' }} href={question.link} target="_blank">
            {question.blurb}          <img id="toLink-image" src={ToLink} alt="click here"  />
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
          <div id='arrow-stack'>
            <div id='next-text'>NEXT</div>
            <div className="arrow right"></div>
            <div className="arrow right"></div>
            <div className="arrow right"></div>
            <div className="arrow right"></div>
          </div> 
        </div>
      </div>
    </>
  )
}

export default Answer;
