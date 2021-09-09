import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Answer({offBy, guess, handleNextQ, question}) {

  return (
    <>
    <div className='answer-section'>
      <div className='answer-text'>
        <h3>Your guess of {guess} was</h3>
        <div className='title'>Off By {offBy} %</div>
        <h3>{question.answerText}</h3>
      </div>
      <div className = 'facts'>
        <div className = 'column'>
          <img className = 'image' src={question.image} />
        </div>
        <div className = 'column'>
          <a className ='blurb' style={{ textDecoration: 'none' }} href={question.link} target="_blank">
            {question.blurb}
          </a>
        </div>
      </div> 
    </div>

    <div className = 'bottom-strip'>
      <div className = 'info'>
        <div>
          Contributed by: {question.by}
        </div> 
        <div>
          Category: {question.category}
        </div>
        <div>
          Source: {question.link}
        </div>
      </div>
      <button className= 'buttonNext' onClick={() => handleNextQ()}>Next</button>  
    </div>
    </>
  )
}

export default Answer;
