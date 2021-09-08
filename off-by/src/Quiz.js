import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Slider from './InputSlider';
import Answer from './Answer';
import { integerPropType } from '@mui/utils';
import { Water } from '@mui/icons-material';
var abs = require('math-abs' );

function Quiz() {
    const questions = [
		{
			questionText: 'How tall is Mt.Everest?',
			answer: '29,032',
			answerText: "Mt.Everest is 29,032 feet tall",
			min: '1000',
			max: '50000',
			units: 'feet',
			category: 'Earth'
		},
		{
			questionText: 'How many Earths does Jupiter weigh?',
			answer: '318',
			answerText: "Jupiter weighs 318 Earths",
			min: '1',
			max: '1000',
			units: 'Earths',
			category: 'Earth'
			
		},
		{
			questionText: 'What is the age of the oldest living land animal',
			answer: '189',
			answerText: "Jonathan, a giant tortise is believed to have been born in 1832",
			min: '100',
			max: '500',
			units: 'years',
			link: 'https://www.guinnessworldrecords.com/world-records/511806-oldest-living-land-animal',
			category: 'Earth'
			
		},
		{
			questionText: 'When did Alexander Graham Bell invent his telephone?',
			answer: '1876',
			answerText: "Bell's 1876 telephone was not the first telephone, but his was the most succesful.",
			min: '1600',
			max: '2000',
			units: 'A.D.',
			Link: 'https://www.history.com/topics/inventions/alexander-graham-bell',
			category: 'History'
			
		},
		{
			questionText: 'What percent of the Earth is covered by water?',
			answer: '71',
			answerText: "Water covers about 71 percent of the Earths surface",
			min: '0',
			max: '100',
			units: '%',
			category: 'Earth',
			Link: "https://www.usgs.gov/special-topic/water-science-school/science/how-much-water-there-earth?qt-science_center_objects=0#qt-science_center_objects",		
		},
		
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);
	const [score, setScore] = useState(0);
	const [guess, setGuess] = useState(0);
	const [offBy, setOffBy] = useState(0);

	const calcOffBy = () => {
		let offByNum = abs(parseInt((questions[currentQuestion].answer) - parseInt(guess)))
		offByNum = offByNum/((parseInt(questions[currentQuestion].max) - parseInt(questions[currentQuestion].min)));
		setOffBy(((100*offByNum).toPrecision(3)));
	}

	const handleGuessChange = (guess) => {
		setGuess(guess);
	}
	const handleNextQ = () => {
		const nextQuestion = currentQuestion + 1;
		setShowAnswer(false);
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);		
				
		} else {		
			setShowScore(true);
		}
	}
		
	const handleAnswerOptionClick = () => {

		calcOffBy()
		setShowAnswer(true);
			
	};

	
	let screen;

	if(showScore){
		screen = <Redirect to="/Score" />;
	}else if(showAnswer){
		screen = <Answer offBy = {offBy} answerText = {questions[currentQuestion].answerText} guess = {guess} handleNextQ = {handleNextQ} />;
	}else{
		screen = <>
			<div className='question-section'>
				<div className='question-count'>
					<span>Question {currentQuestion + 1}</span>/{questions.length}
				</div>
				<div className='question-text'>{questions[currentQuestion].questionText}</div>
			
				<Slider min = {questions[currentQuestion].min} max = {questions[currentQuestion].max} handleGuessChange ={handleGuessChange}/>
				<div className='question-count'>{guess} {questions[currentQuestion].units}</div>	
				<button onClick={() => handleAnswerOptionClick()}>Show Answer</button>
			</div>		
		</>;				
	}
	
  return (
    <>
		{screen}
    </>
  )
}

export default Quiz;
//<div>Question 1</div>            <a href="/Score">Done</a>
/*
<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
					*/