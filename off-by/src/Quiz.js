import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect, useHistory} from "react-router-dom";
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
	const history = useHistory();

	const quizLength = 10;

	useEffect(()=>{
			
			callBackendAPI().then((res) =>{
				populate(res);
			});

	}, [])

	
	const addPlay = async (e) => {

		const response = await fetch('/addPlay');
		const body = await response.json();
	
		if (response.status !== 200) {
		  throw Error(body.message) 
		}

	}

	const populate = (res) =>{
		addPlay();
		for(let number =0; number < 10; number++){
			setQuestions(qStore =>[
				...qStore, {
				question: {
					num: number,
					id: res.Q[number].ID, 
					questionText: res.Q[number].Question,
					answer: res.Q[number].Answer,
					answerText: res.Q[number].AnswerText,
					min: res.Q[number].Min,
					max: res.Q[number].Max,
					units: res.Q[number].Units,
					category: res.Q[number].Category,
					link: res.Q[number].Link,		
					image: res.Q[number].Image,
					blurb: res.Q[number].Blurb,
					by: res.Q[number].By,
					step: res.Q[number].Step,					
					}
				}]
			);

			if(number === 0) {
				setQuestion(
					{
						num: number,
						id: res.Q[number].ID, 
						questionText: res.Q[number].Question,
						answer: res.Q[number].Answer,
						answerText: res.Q[number].AnswerText,
						min: res.Q[number].Min,
						max: res.Q[number].Max,
						units: res.Q[number].Units,
						category: res.Q[number].Category,
						link: res.Q[number].Link,		
						image: res.Q[number].Image,
						blurb: res.Q[number].Blurb,
						by: res.Q[number].By,
						step: res.Q[number].Step,		
					});
				}
			}
	}


	useEffect(()=>{
			questionStore.filter(q => (q.question.num === currentQuestion))
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
		var offByNum = abs(parseFloat((question.answer) - parseFloat(guess)));
		offByNum = offByNum/((parseInt(question.max) - parseInt(question.min)));
		offByNum = ((100*offByNum).toPrecision(3));
		setOffBy(offByNum)
		setScores(scores => [...scores, offByNum])	
	}

	const calcScore = () => {
		const average = scores.reduce((sum, curr) => sum + Number(curr),0) / scores.length;
		handleScore(average);
		setShowScore(true);
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
		if (nextQuestion <= quizLength-1) {
			setCurrentQuestion(nextQuestion);
						
		} else {		
			calcScore();

		}
	}

	const goToScore = () =>{
		if(showScore){
			history.push("/Score");
		}
	}

	goToScore();
		
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
