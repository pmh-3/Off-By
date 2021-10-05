const { query } = require('express');
const express = require('express'); 
const {readFileSync, writeFileSync} = require('fs');
const app = express(); 
const port = process.env.PORT || 5000; 
var mysql = require('mysql');
const util = require('util');


var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Catchfire3@**$",
    database: "obdb"
}); 
  
//DB INITIALIZATION 
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    /*
    con.query("CREATE DATABASE obdb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });

    */
    /*
    var sql = "DROP TABLE questions";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
    });
   // 

    var createtbl = "CREATE TABLE questions (`ID` INT NOT NULL AUTO_INCREMENT, `Question` LONGTEXT NULL,`Answer` FLOAT NULL,`Min` INT NULL, `Max` INT NULL,`Units` VARCHAR(50) NULL,`AnswerText` LONGTEXT NULL,`Blurb` LONGTEXT NULL,`Link` LONGTEXT NULL, `Image` LONGTEXT NULL, `By` LONGTEXT NULL,`Step` FLOAT NULL,`Category` VARCHAR(100) NULL, PRIMARY KEY (`ID`));"
    con.query(createtbl, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var loadData = "LOAD DATA LOCAL INFILE 'questions.csv' INTO TABLE questions FIELDS TERMINATED BY '~' LINES TERMINATED BY '\n' IGNORE 1 ROWS;"
    con.query(loadData, function (err, result) {
        if (err) throw err;
        console.log("data loaded");
    });

    /*
    var loadData = "SELECT COL_LENGTH('questions','ID') AS Result;"
    con.query(loadData, function (err, result) {
        if (err) throw err;
        console.log("Queston total: ", result);
        questonTotal = result;
    });
   

        var sql = "DROP TABLE leaderboard";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
    });

    createLB = "CREATE TABLE leaderboard (`ID` INT NOT NULL AUTO_INCREMENT,`Name` VARCHAR(100) NOT NULL, `Score` FLOAT NULL, PRIMARY KEY (`ID`));"
    con.query(createLB, function (err, result) {
        if (err) throw err;
        console.log("LB Table created");
    });

    for(let i = 0; i<21; i++){

        var addLeader ="INSERT INTO leaderboard (Name, Score) VALUES (' ','100');"
        con.query(addLeader, function (err, result) {
            if (err) throw err;
            console.log("Leader Added");
        });
    }    
         */

 
});

app.listen(port, () => console.log(`Listening on port ${port}`)); 


var questionTotal = 26;


con.connect(function(err){

    app.get('/getQuestions', (req, res) => {
        var sentQs = [];

            /*

            async function example1 () {
                const mysql = require('mysql2/promise');
                const conn = await mysql.createConnection({ database: test });
                let [rows, fields] = await conn.execute('select ?+? as sum', [2, 2]);
              }
              */

            var qArr =[];
            var qNum = [];
            var questions = [];
            for(let i=0; i<10; i++){
                let randomNumber = Math.floor(Math.random()*questionTotal)+1;  
                while(sentQs.includes(randomNumber)){
                    randomNumber = Math.floor(Math.random()*questionTotal)+1;   
                    console.log('loop doop');     
                }
               console.log(randomNumber);
               qNum.push(randomNumber);
                sentQs.push(randomNumber);
                if(sentQs.length>=questionTotal){
                    sentQs = [];
                }
            }  
            console.log(qNum);

            var sql = 'SELECT * FROM questions WHERE ID in (' + mysql.escape(qNum[0]) + ','+ mysql.escape(qNum[1])+ ','+ mysql.escape(qNum[2])+ ','+ mysql.escape(qNum[3])+ ','+ mysql.escape(qNum[4])+ ','+ mysql.escape(qNum[5])+ ','+ mysql.escape(qNum[6])+ ','+ mysql.escape(qNum[7])+ ','+ mysql.escape(qNum[8])+ ','+ mysql.escape(qNum[9])+ ')';
            con.query(sql, function (err, result) {  
                if (err) throw err;

                for(var i of result){
                    qArr.push(i)
                }

                //console.log(result);

                var T = Object.values(JSON.parse(JSON.stringify(qArr)));
                T.forEach((v) => questions.push(v));  
                
       
    
          //  console.log(questions);
        
                res.send({
                    Q: [ {
                        ID: questions[0].ID,
                        Question: questions[0].Question,
                        Answer: questions[0].Answer,
                        Min: questions[0].Min,
                        Max: questions[0].Max,
                        Units: questions[0].Units,
                        AnswerText: questions[0].AnswerText,
                        Blurb: questions[0].Blurb,
                        Link: questions[0].Link,
                        Image: questions[0].Image,
                        By: questions[0].By,
                        Step: questions[0].Step,
                        Category: questions[0].Category
                    },
                    {
                        ID: questions[1].ID,
                        Question: questions[1].Question,
                        Answer: questions[1].Answer,
                        Min: questions[1].Min,
                        Max: questions[1].Max,
                        Units: questions[1].Units,
                        AnswerText: questions[1].AnswerText,
                        Blurb: questions[1].Blurb,
                        Link: questions[1].Link,
                        Image: questions[1].Image,
                        By: questions[1].By,
                        Step: questions[1].Step,
                        Category: questions[1].Category
                    },
                    {
                        ID: questions[2].ID,
                        Question: questions[2].Question,
                        Answer: questions[2].Answer,
                        Min: questions[2].Min,
                        Max: questions[2].Max,
                        Units: questions[2].Units,
                        AnswerText: questions[2].AnswerText,
                        Blurb: questions[2].Blurb,
                        Link: questions[2].Link,
                        Image: questions[2].Image,
                        By: questions[2].By,
                        Step: questions[2].Step,
                        Category: questions[2].Category
                    },
                    {
                        ID: questions[3].ID,
                        Question: questions[3].Question,
                        Answer: questions[3].Answer,
                        Min: questions[3].Min,
                        Max: questions[3].Max,
                        Units: questions[3].Units,
                        AnswerText: questions[3].AnswerText,
                        Blurb: questions[3].Blurb,
                        Link: questions[3].Link,
                        Image: questions[3].Image,
                        By: questions[3].By,
                        Step: questions[3].Step,
                        Category: questions[3].Category
                    },
                    {
                        ID: questions[4].ID,
                        Question: questions[4].Question,
                        Answer: questions[4].Answer,
                        Min: questions[4].Min,
                        Max: questions[4].Max,
                        Units: questions[4].Units,
                        AnswerText: questions[4].AnswerText,
                        Blurb: questions[4].Blurb,
                        Link: questions[4].Link,
                        Image: questions[4].Image,
                        By: questions[4].By,
                        Step: questions[4].Step,
                        Category: questions[4].Category
                    },
                    {
                        ID: questions[5].ID,
                        Question: questions[5].Question,
                        Answer: questions[5].Answer,
                        Min: questions[5].Min,
                        Max: questions[5].Max,
                        Units: questions[5].Units,
                        AnswerText: questions[5].AnswerText,
                        Blurb: questions[5].Blurb,
                        Link: questions[5].Link,
                        Image: questions[5].Image,
                        By: questions[5].By,
                        Step: questions[5].Step,
                        Category: questions[5].Category
                    },
                    {
                        ID: questions[6].ID,
                        Question: questions[6].Question,
                        Answer: questions[6].Answer,
                        Min: questions[6].Min,
                        Max: questions[6].Max,
                        Units: questions[6].Units,
                        AnswerText: questions[6].AnswerText,
                        Blurb: questions[6].Blurb,
                        Link: questions[6].Link,
                        Image: questions[6].Image,
                        By: questions[6].By,
                        Step: questions[6].Step,
                        Category: questions[6].Category
                    },
                    {
                        ID: questions[7].ID,
                        Question: questions[7].Question,
                        Answer: questions[7].Answer,
                        Min: questions[7].Min,
                        Max: questions[7].Max,
                        Units: questions[7].Units,
                        AnswerText: questions[7].AnswerText,
                        Blurb: questions[7].Blurb,
                        Link: questions[7].Link,
                        Image: questions[7].Image,
                        By: questions[7].By,
                        Step: questions[7].Step,
                        Category: questions[7].Category
                    },
                    {
                        ID: questions[8].ID,
                        Question: questions[8].Question,
                        Answer: questions[8].Answer,
                        Min: questions[8].Min,
                        Max: questions[8].Max,
                        Units: questions[8].Units,
                        AnswerText: questions[8].AnswerText,
                        Blurb: questions[8].Blurb,
                        Link: questions[8].Link,
                        Image: questions[8].Image,
                        By: questions[8].By,
                        Step: questions[8].Step,
                        Category: questions[8].Category
                    },
                    {
                        ID: questions[9].ID,
                        Question: questions[9].Question,
                        Answer: questions[9].Answer,
                        Min: questions[9].Min,
                        Max: questions[9].Max,
                        Units: questions[9].Units,
                        AnswerText: questions[9].AnswerText,
                        Blurb: questions[9].Blurb,
                        Link: questions[9].Link,
                        Image: questions[9].Image,
                        By: questions[9].By,
                        Step: questions[9].Step,
                        Category: questions[9].Category
                    },
                    
                    ]
                });

            });
    }); 


    
    app.get('/getPlays', (req, res) => {
        console.log("getting plays");

        const count = readFileSync('./count.txt', 'utf-8');

        console.log('count ', String(count));

        res.send({
            plays: String(count)
        })

    });

    app.post('/addPlay', (req, res) => {

        const count = readFileSync('./count.txt', 'utf-8');
    
        const newCount = parseInt(count) + 1

        writeFileSync('./count.txt', String(newCount));
        console.log('count ', newCount);

        res.send(
        `I received your POST request. This is what you sent me: ${req.body}`,
        );
    });

            
    app.get('/getLeaderBoard', (req, res) => {
        console.log("getting LB");

        /* //Unable to get count of records in column
        var count = 'SELECT COUNT(ID) AS total FROM leaderboard;'
        con.query(count, function (err, result) {
            if (err) throw err;
            var coloncount = result;
            leaderCount = coloncount.toString().replace(':', ' ');
            leaderCount = parseInt(leaderCount);

            if(leaderCount > 20){
                leaderCount = 20;
            }
            console.count("leadercount", result);
        });
        */

        var sort = 'SELECT * FROM leaderboard ORDER BY Score;'
        con.query(sort, function (err, result) {
            if (err) throw err;
        });

        var getLeaders = 'SELECT * FROM leaderboard ORDER BY Score LIMIT 21;'
        var LBarr = [];
        var LB = [];
       
        con.query(getLeaders, function (err, result) {   
            if (err) throw err;
        
            for(var i of result){
                LBarr.push(i)
            }
    
            const leaders = Object.values(JSON.parse(JSON.stringify(LBarr)));
            leaders.forEach((v) => LB.push(v));      
            console.log(LB);
    
            res.send(
                {
                   L:[
                       { Name:LB[0].Name, Score:LB[0].Score,Rank:0},
                       { Name:LB[1].Name, Score:LB[1].Score,Rank:1},
                       { Name:LB[2].Name, Score:LB[2].Score,Rank:2},
                       { Name:LB[3].Name, Score:LB[3].Score,Rank:3},
                       { Name:LB[4].Name, Score:LB[4].Score,Rank:4},
                       { Name:LB[5].Name, Score:LB[5].Score,Rank:5},
                       { Name:LB[6].Name, Score:LB[6].Score,Rank:6},
                       { Name:LB[7].Name, Score:LB[7].Score,Rank:7},
                       { Name:LB[8].Name, Score:LB[8].Score,Rank:8},
                       { Name:LB[9].Name, Score:LB[9].Score,Rank:9},
                       { Name:LB[10].Name, Score:LB[10].Score,Rank:10},
                       { Name:LB[11].Name, Score:LB[11].Score,Rank:11},
                       { Name:LB[12].Name, Score:LB[12].Score,Rank:12},
                       { Name:LB[13].Name, Score:LB[13].Score,Rank:13},
                       { Name:LB[14].Name, Score:LB[14].Score,Rank:14},
                       { Name:LB[15].Name, Score:LB[15].Score,Rank:15},
                       { Name:LB[16].Name, Score:LB[16].Score,Rank:16},
                       { Name:LB[17].Name, Score:LB[17].Score,Rank:17},
                       { Name:LB[18].Name, Score:LB[18].Score,Rank:18},
                       { Name:LB[19].Name, Score:LB[19].Score,Rank:19},
                       { Name:LB[20].Name, Score:LB[20].Score,Rank:20},
                   ]      
                }
            );
              
        }); 
    }); 


    app.post('/addLeader', (req, res) => {
        console.log(req.body);

        var Score = req.body.score.score;
        var Name = req.body.name;


        var addLeader ="INSERT INTO leaderboard (Name, Score) VALUES ('"+Name+"','"+Score+"');"
        con.query(addLeader, function (err, result) {
            if (err) throw err;
            console.log("Leader Added");
        });

        res.send(
        `I received your POST request. This is what you sent me: ${req.body.name}`,
        );
    });

});


/*
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
]
*/