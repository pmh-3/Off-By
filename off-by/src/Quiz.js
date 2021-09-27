import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Slider from './InputSlider';
import Answer from './Answer';
import Timer from './Timer';
import './Quiz.css';
var abs = require('math-abs' );

function Quiz({handleScore}) {

	const [questionStore, setQuestions] = useState([]);
	const [question, setQuestion] = useState({id:-1});
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);
	const [scores, setScores] = useState([100])
	const [guess, setGuess] = useState(0);
	const [offBy, setOffBy] = useState(0);

	const quizLength = 10;

	useEffect(()=>{
		for(let number =0; number < 10; number++){
			callBackendAPI().then(res =>
					setQuestions(qStore =>[
						... qStore, {
						question: {
							num: number,
							id: res.id, 
							questionText: res.questionText,
							answer: res.answer,
							answerText: res.answerText,
							min: res.min,
							max: res.max,
							units: res.units,
							category: res.category,
							link: res.link,		
							image: res.image,
							blurb: res.blurb,
							by: res.by,
							step: res.step,					
							}
						}]
				).then((number == 0) ? () => setQuestion(
						{
							num: number,
							id: res.id, 
							questionText: res.questionText,
							answer: res.answer,
							answerText: res.answerText,
							min: res.min,
							max: res.max,
							units: res.units,
							category: res.category,
							link: res.link,		
							image: res.image,
							blurb: res.blurb,
							by: res.by,			
							step: res.step,	
						}): null))
			.catch(err => console.log(err));
		}
	}, [])


	useEffect(()=>{
			questionStore.filter(q => (q.question.num == currentQuestion))
			.map(q => setQuestion(q.question));		
	})

	const callBackendAPI = async () => {
		const response = await fetch('/getQuestions');
		const body = await response.json();
	
		if (response.status !== 200) {
		  throw Error(body.message) 
		}
		return body;
	};

	const calcOffBy = () => {
		var offByNum = abs(parseInt((question.answer) - parseInt(guess)));
		offByNum = offByNum/((parseInt(question.max) - parseInt(question.min)));
		offByNum = ((100*offByNum).toPrecision(3));
		setOffBy(offByNum)
		setScores(scores => [...scores, offByNum])	
	}

	const calcScore = () => {
		const average = scores.reduce((sum, curr) => sum + Number(curr),0) / scores.length;
		handleScore(average)
	}

	const handleGuessChange = (guess) => {
		if(guess> question.max){
			setGuess(question.max);
		}else if(guess < question.min){
			setGuess(question.min)
		}else{
			setGuess(guess);
		}
	}

	const handleNextQ = () => {	
		const nextQuestion = currentQuestion + 1;
		
		setShowAnswer(false);
		if (nextQuestion < quizLength-1) {
			setCurrentQuestion(nextQuestion);
						
		} else {		
			calcScore();
			setShowScore(true);
		}
	}
		
	const handleAnswerOptionClick = () => {
		calcOffBy()
		setShowAnswer(true);			
	};

	const timesUp = () => {
		calcOffBy()
		setShowAnswer(true);
	}

	let screen;

	if(showScore){
		screen = <Redirect to="/Score" />;
	}else if(showAnswer){
		screen = <Answer offBy = {offBy}  answerText = {question.answerText} guess = {guess} handleNextQ = {handleNextQ} question ={question} />;
	}else{
		screen = <>	
			<div className="quiz-container">
						<div id="timer" >		
							<Timer timesUp ={timesUp}></Timer>
						</div>	
						<div id='question-count'>
							<span>Question {currentQuestion + 1}</span>/{quizLength}
						</div>
					<div id= 'question-section'>						
						<div className='question-text'>{question.questionText}</div>							
					</div>	
					<div id='inputs'>
						<Slider min = {question.min} max = {question.max} units = {question.units} step= {question.step} handleGuessChange ={handleGuessChange} />
					</div>				
					<div id="answer"> 
							<div id='show-answer' onClick={() => handleAnswerOptionClick()}></div>
					</div>	
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
