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



		*/