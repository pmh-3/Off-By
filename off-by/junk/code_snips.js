	/*

	C:\Program Files\MySQL\MySQL Server 8.0\bin>


		CREATE TABLE `sys`.`questions` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Question` LONGTEXT NULL,
  `Answer` FLOAT NULL,
  `Min` INT NULL,
  `Max` INT NULL,
  `Units` VARCHAR(50) NULL,
  `AnswerText` LONGTEXT NULL,
  `Blurb` LONGTEXT NULL,
  `By` LONGTEXT NULL,
  `Step` FLOAT NULL,
  `Category` VARCHAR(100) NULL,
  `Link` LONGTEXT NULL,
  `Image` LONGTEXT NULL,
  PRIMARY KEY (`ID`));

mysql --local-infile=1 -u root -p
LOAD DATA LOCAL INFILE 'C:/Users/pmh3r/Documents/Off-By/server/questions.csv' INTO TABLE questions FIELDS TERMINATED BY '~' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
Control pannel Region change lsit seperator


//how to find length of col
SELECT COUNT(DISTINCT Country) FROM Customers;

  id: randomNumber,
                questionText: questions[randomNumber].questionText,
                answer: questions[randomNumber].answer,
                answerText: questions[randomNumber].answerText,
                min: questions[randomNumber].min,
                max: questions[randomNumber].max,
                units: questions[randomNumber].units,
                category: questions[randomNumber].category,
                link: questions[randomNumber].link,
                blurb: questions[randomNumber].blurb,
                by: questions[randomNumber].by,
                image: questions[randomNumber].image

				
				

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













    import React, {useState, useRef, useEffect} from 'react';

function LeaderBoard({score}) {

    const [name, setName] = useState();
    const [flag, setFlag] = useState("nuffin");
    const [LB, setLB] = useState([]);
    const [isLeader, setLeader] = useState(false);

    var screen = <></>;

    const refreshLB = ()=>{
        setLB([]);
        return Promise.resolve(0);
    };
    
    useEffect(()=>{
        refreshLB().then((num) => init());
    },[])

    useEffect(()=>{
        
        //Leaderboard duplicates if init is ran again
      // refreshLB().then((num) => init());
    },[flag])

    const init = ()=>{
        //setLB([]); //doesnt do anything

        for(let i=0; i<21;i++){
            getLB().then(res =>
                setLB(l =>[... l,{
                    Name: res.Name,
                    Score: res.Score,
                    Rank: i
                }])
            ).catch(err => console.log(err));
        }      
    }

    const getLB = async () => {
        const response = await fetch('/getLeaderBoard');
        const body = await response.json();
        //body = JSON.parse(body);
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
    };

    const addLeader = async (e) => {
        const response = await fetch('/addLeader', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: {name}, score: {score},}),
        });
        const body = await response.text();
        console.log(body);


        window.location.reload(false);

        //Remove name entry
        ///screen = <></>;
        setLeader(false);
        //setLB([]);
        //setFlag("Leader added");
    }

    
    var scoretobeat;
    const checkLeader = (score) =>{
        if(LB.length<20){
            setLeader(true);
        }else{     
    
            LB.filter(l => (l.Rank == 20))
            .map(l => {scoretobeat = l.Score});	

            if(parseInt(scoretobeat) >= parseInt(score)){
                setLeader(true);
            }
        }
    }

    checkLeader(score);

    if(isLeader){
        screen = <>
            <div className="add-leader">
                <p>
                    <div></div>
                    <div>Congratulations!!</div>
                    <div>You are an HONORARY OTTER!</div>
                    <strong>Enter Your Name:</strong>
                </p>
                <input
                    className= "input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={()=>addLeader()} >Enter</button>
            </div>
                </>;
    }else{
        screen = <></>;
    }

    return(
        <>
        <div>{screen}</div>
        <div className= "leaderboard">
                <div id= 'lb-title'>LeaderBoard</div>
                <ul class="no-bullets">
                    {LB.map((l) => (
                        <li key={l.Rank}>{l.Rank}. {l.Name}: {l.Score}%</li>
                    ))}
                </ul>
        </div>
        </>
    )
}
export default LeaderBoard;

		*/