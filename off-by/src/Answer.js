import React, {useState, useRef, useEffect} from 'react';

function Answer({offBy, guess, answerText, handleNextQ}) {

  return (
    <>
    <h3>Your guess of {guess} was</h3>
    <h1>Off By {offBy} %</h1>
    <h3>{answerText}</h3>
    <button onClick={() => handleNextQ()}>Next</button>
    </>
  )
}

export default Answer;
