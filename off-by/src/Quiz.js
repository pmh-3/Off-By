import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Slider from './InputSlider';
import Answer from './Answer';
import Timer from './Timer';
import { integerPropType } from '@mui/utils';
import { Water } from '@mui/icons-material';
var abs = require('math-abs' );

function Quiz({handleScore}) {
    const questions = [
		{
			questionText: 'How tall is Mt.Everest?',
			answer: '29032',
			answerText: "Mt.Everest is 29,032 feet tall",
			min: '1000',
			max: '50000',
			units: 'feet',
			category: 'Earth',
			link: 'https://www.bbc.com/news/world-asia-55218443',
			blurb: "Everest stands on the border between China and Nepal. The two disagree wether the four meters of snow on the peak should be included in the height.",
			by: "Waffler",
			image:"https://ichef.bbci.co.uk/news/976/cpsprodpb/78A5/production/_115958803_mediaitem115958802.jpg",
		},
		{
			questionText: 'How many Earths does Jupiter weigh?',
			answer: '318',
			answerText: "Jupiter weighs 318 Earths",
			min: '1',
			max: '800',
			units: 'Earths',
			category: 'Earth',
			link: 'https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-jupiter-k4.html',
			blurb: "Jupiter is the largest planet in the solar system. Jupiter is so big that all the other planets in the solar system could fit inside it.",
			image: "https://solarsystem.nasa.gov/system/feature_items/images/11_Full_Jupiter-800.jpg",
			by: "Waffler Jr.",
		},
		{
			questionText: 'What is the age of the oldest living land animal?',
			answer: '189',
			answerText: "Jonathan is an 189 year old giant tortise believed to have been born in 1832",
			min: '100',
			max: '500',
			units: 'years',
			link: 'https://www.guinnessworldrecords.com/world-records/511806-oldest-living-land-animal',
			category: 'Earth',
			blurb: 'Jonathan is a Seychelles giant tortoise, originally from the Seychelles but now a long-time resident of the remote South Atlantic island of St Helena.',
			image: 'https://www.guinnessworldrecords.com/Images/jonathan-feb-2019_tcm25-562217.jpg',
			by: "Calista",
			
		},
		{
			questionText: 'When did Alexander Graham Bell invent his telephone?',
			answer: '1876',
			answerText: "Bell's 1876 telephone was not the first telephone, but his was the most succesful.",
			min: '1600',
			max: '2000',
			units: 'A.D.',
			link: 'https://www.loc.gov/everyday-mysteries/technology/item/who-is-credited-with-inventing-the-telephone/',
			category: 'History',
			image: 'https://www.loc.gov/static/managed-content/uploads/sites/16/2018/09/telephone_Bell.jpg',
			blurb: 'Antonio Meucci, an Italian immigrant, began developing the design of a talking telegraph or telephone in 1849. In 1871, he filed a caveat (an announcement of an invention) for his design of a talking telegraph. Due to hardships, Meucci could not renew his caveat.',
			by: "Waffler",
			
		},
		{
			questionText: 'What percent of the Earth is covered by water?',
			answer: '71',
			answerText: "Water covers about 71 percent of the Earths surface",
			min: '0',
			max: '100',
			units: '%',
			category: 'Earth',
			link: "https://www.usgs.gov/special-topic/water-science-school/science/how-much-water-there-earth?qt-science_center_objects=0#qt-science_center_objects",		
			image: 'https://i.pinimg.com/originals/a7/7d/5a/a77d5a012c7eccb262e84a7689bb8212.jpg',
			blurb: "The oceans hold about 96.5 percent of all Earth's water. Water also exists in the air as water vapor, in rivers and lakes, in icecaps and glaciers, in the ground as soil moisture and in aquifers, and even in you and your dog.",
			by: "Waffler",
		},
		{
			questionText: 'How many volts can an electric eel generate',
			answer: '600',
			answerText: "An electric eel can generate 600 volts ",
			min: '1',
			max: '1000',
			units: 'Volts',
			category: 'Earth',
			link: 'https://nationalzoo.si.edu/animals/electric-eel',
			blurb: "Electric eels grow up to 8 feet! Three specialized electric organs create strong and weak electric charges, which are utilized for defense, hunting, communication and navigation.",
			by: "Ben Haasch",
			image: 'https://nationalzoo.si.edu/sites/default/files/styles/1400x700_scale_and_crop/public/animals/electric-eel-homepage-slide.jpg?itok=-aujqBn7&timestamp=1520538731',

		},
		{
			questionText: 'How many zip codes are in the US?',
			answer: '42',
			answerText: "There are 41,692 ZIP codes in the US ranging from 00501 to 99950.",
			min: '1',
			max: '100',
			units: 'Thousand',
			category: 'World',
			link: 'https://facts.usps.com/42000-zip-codes/#:~:text=There%20are%2041%2C692%20ZIP%20Codes%20in%20the%20country.&text=ZIP%20Codes%20range%20from%2000501,Easiest%20to%20remember%3F',
			blurb: "",
			by: "Ben Haasch",
			image: 'https://www.mapbusinessonline.com/blog/wp-content/uploads/2019/07/3DigitZIPs.png',

		},
		{
			questionText: 'How expensive is a Rolls-Royce Ghost?',
			answer: '312',
			answerText: "A 2020 Rolls-Royce Ghost will set you back $312,00! Tax not included.",
			min: '10',
			max: '999',
			units: 'Thousand $',
			category: 'Variety',
			link: 'https://www.rolls-roycemotorcars.com/en_US/showroom/ghost-in-detail.html',
			blurb: "Rolls-Royce is a subsidiary of BMW and is headquartered in Goodwood, England.",
			by: "Waffler",
			image: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAES8DG.img?w=354&h=236&m=7',

		},
		{
			questionText: 'How long is the longest field goal in NFL history?',
			answer: '64',
			answerText: "The longest field goal in the NFL is 64 yards.",
			min: '0',
			max: '100',
			units: 'yards',
			category: 'Sports',
			link: 'https://bleacherreport.com/articles/2724807-the-10-longest-field-goals-in-nfl-history',
			blurb: "Broncos placekicker, Matt Prater broke the record in 2013. The previous record was a yard shorter and was kicked in 1970.",
			by: "Waffler",
			image: 'https://www.si.com/.image/t_share/MTY4MDA3MzYwMTk2OTEyNTEy/longest-field-goal-nfl-historyjpg.jpg',

		},
		{
			questionText: 'What is the worlds population?',
			answer: '7.892',
			answerText: "There are just over 7,892,000,000 people living on planet Earth",
			min: '1',
			max: '100',
			units: 'billion',
			category: 'World',
			link: 'https://www.worldometers.info/watch/world-population/',
			blurb: "The most populated countries are China (~1.5 billion), India (1.4 billion), and U.S.A. (.33 billion). The worlds current growth rate is 1.05%.",
			by: "Waffler",
			image: 'https://www.worldometers.info/img/world_population_density.gif',
		},	
		
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [showAnswer, setShowAnswer] = useState(false);

	const [scores, setScores] = useState([])
	const [guess, setGuess] = useState(0);
	const [offBy, setOffBy] = useState(0);

	const init = () => {
		setGuess(questions[currentQuestion+1].min);
	}

	const calcOffBy = () => {
		var offByNum = abs(parseInt((questions[currentQuestion].answer) - parseInt(guess)));
		offByNum = offByNum/((parseInt(questions[currentQuestion].max) - parseInt(questions[currentQuestion].min)));
		offByNum = ((100*offByNum).toPrecision(3));
		setOffBy(offByNum)
		setScores(scores => [...scores, offByNum])	

		/*
		
				

				setScores({
			scores: [...scores, offByNum]
		})

				const addScore = (Num) => setScores(scores => {
			return [...scores, Num]})

		addScore(offByNum);
		var total = 0;
		scores.map((s) => (total+s));
		setScore(parseInt((total/scores.length)));


		if((currentQuestion+1) === 1){
			setScore(offByNum);
		}else{
			//New average = old average * (n-1)/n + new value /n
			var avg = score*(currentQuestion/currentQuestion+1) + offByNum/(currentQuestion+1);
			setScore((avg).toPrecision(3));
		}
		*/
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
		if (nextQuestion < questions.length) {
			init();
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
		screen = <Answer offBy = {offBy}  answerText = {questions[currentQuestion].answerText} guess = {guess} handleNextQ = {handleNextQ} question ={questions[currentQuestion]} />;
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
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
					</div>
				</div>	
				<div className= 'question-section'>
					<div className='question-text'>{questions[currentQuestion].questionText}</div>		
					<Slider min = {questions[currentQuestion].min} max = {questions[currentQuestion].max} units = {questions[currentQuestion].units} handleGuessChange ={handleGuessChange} />	
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
