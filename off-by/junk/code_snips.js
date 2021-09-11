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