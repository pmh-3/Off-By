import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Slider from './InputSlider';
import Answer from './Answer';
import Timer from './Timer';
import { integerPropType } from '@mui/utils';
import { Water } from '@mui/icons-material';
var abs = require('math-abs' );

function Quiz({handleScore}) {


	const [questionStore, setQuestions] = useState([]);
	const [question, setQuestion] = useState({id:-1});
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);

	const [scores, setScores] = useState([])
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
							by: res.by					
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
							by: res.by			
						}): null))
			.catch(err => console.log(err));
		}
	}, [])

	useEffect(()=>
			questionStore.filter(q => (q.question.num == currentQuestion))
			.map(q =>setQuestion(q.question))
	)

	const callBackendAPI = async () => {
		const response = await fetch('/express_backend');
		const body = await response.json();
	
		if (response.status !== 200) {
		  throw Error(body.message) 
		}
		return body;
	};

	const init = () => {
		//setGuess(questions[currentQuestion+1].min);
	}

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
		setGuess(guess);
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
				
				<div className= 'upper-ribbon'>
					<div className= 'column'>
						<div className='dot' >
							
							<Timer timesUp ={timesUp}></Timer>
						</div>	
					</div>
					<div className= 'column'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{quizLength}
						</div>
					</div>
				</div>	
				<div className= 'question-section'>		
					<div>{currentQuestion}</div>	
					<div>{question.num}</div>
					<div>{question.id}</div>	
					
					<div className='question-text'>{question.questionText}</div>		
					<Slider min = {question.min} max = {question.max} units = {question.units} handleGuessChange ={handleGuessChange} />	
					<button  onClick={() => handleAnswerOptionClick()}>Show Answer</button>
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
//<div>{questionStore.filter(q => (q.questuin.id==2)).map(m =>(<li key = {m.id}>{m.questionText}</li>))}</div>
//<div>{question.id}</div>