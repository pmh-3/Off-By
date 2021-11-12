const { query } = require('express');
const express = require('express'); 
const {readFileSync, writeFileSync} = require('fs');
const app = express(); 
const port = process.env.PORT || 5000; 
var mysql = require('mysql');
const util = require('util');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

'use strict';

var dbpool = require('mysql').createPool({
    connectionLimit: 10,
    acquireTimeout: 30000,
    waitForConnections: true,
    database: 'obdb',
    host: 'my-db',
    multipleStatements: true,
    password: 'otters',
    user: 'admin',
});

// app.post('/addLeader', function(req, res){
//     var Name = req.body.name.name;
//     var Score = req.body.score.score;
//     console.log(req.body);
//     //console.log("adding leader");

//     dbpool.getConnection(function(err, connection){
//             if(err){
//                 connection.release();
//                 console.log(' Error getting mysql_pool connection: ' + err);
//                 throw err;
//             }

//         var addLeader ="INSERT INTO leaderboard (Name, Score) VALUES ('"+Name+"','"+Score+"');"
//         connection.query(addLeader, function (err2, result) {
//             if (err2){
//                 console.log(err.code);
//             }else{
//                 console.log("Leader Added");
//             }
//             console.log(' mysql_pool.release()');
//             connection.release();
//         });
//     });
// });





const attemptConnection = () => 
    dbpool.getConnection((err, con)=>{
        if(err){
            console.log('Error connecting, retrying in 1 second');
            if(con) con.destroy();
            setTimeout(attemptConnection,1000);
            return; 
        }else{
            console.log("Connected!");

            var sql = "DROP TABLE IF EXISTS questions ";
            con.query(sql, function (err, result) {
              //  con.release();
                if (err){
                    console.log('Error connecting, retrying in 1 second');
                    console.log(err.code);
                    if(con) con.destroy();
                    setTimeout(attemptConnection,1000);
                    return;
                }
                console.log("Table deleted");
            });

            var createtbl = "CREATE TABLE questions (`ID` INT NOT NULL AUTO_INCREMENT, `Question` LONGTEXT NULL,`Answer` FLOAT NULL,`Min` INT NULL, `Max` INT NULL,`Units` VARCHAR(50) NULL,`AnswerText` LONGTEXT NULL,`Blurb` LONGTEXT NULL,`Link` LONGTEXT NULL, `Image` LONGTEXT NULL, `By` LONGTEXT NULL,`Step` FLOAT NULL,`Category` VARCHAR(100) NULL, PRIMARY KEY (`ID`));"
            con.query(createtbl, function (err, result) {
              //  con.release();
                if (err){
                    console.log('Error connecting, retrying in 1 second');
                    console.log(err.code);
                    if(con) con.destroy();
                    setTimeout(attemptConnection,1000);
                    return;
                }
                console.log("Table created");
            });
        
            var loadData = "LOAD DATA LOCAL INFILE 'questions.csv' INTO TABLE questions FIELDS TERMINATED BY '~' LINES TERMINATED BY '\n' IGNORE 1 ROWS;"
            con.query(loadData, function (err, result) {
                //con.release();
                if (err){
                    console.log('Error connecting, retrying in 1 second');
                    console.log(err.code);
                    if(con) con.destroy();
                    setTimeout(attemptConnection,1000);
                    return;
                }
                console.log("data loaded");
            });
    
            // var sql = "DROP TABLE IF EXISTS leaderboard";
            // con.query(sql, function (err, result) {
            //     if (err) throw err;
            //     console.log("Table deleted");
            // });

            createLB = "CREATE TABLE IF NOT EXISTS leaderboard (`ID` INT NOT NULL AUTO_INCREMENT,`Name` VARCHAR(100) NOT NULL, `Score` FLOAT NULL, PRIMARY KEY (`ID`));"
            con.query(createLB, function (err, result) {
                //con.release();
                if (err){
                    console.log('Error connecting, retrying in 1 second');
                    console.log(err.code);
                    if(con) con.destroy();
                    setTimeout(attemptConnection,1000);
                    return;
                }
                console.log("LB Table created");
            });

            for(let i = 0; i<20; i++){
                var addLeader ="INSERT INTO leaderboard (Name, Score) VALUES ('_____','100');"
                con.query(addLeader, function (err, result) {
                  //  con.release();
                    if (err){
                        console.log('Error connecting, retrying in 1 second');
                        console.log(err.code);
                        if(con) con.destroy();
                        setTimeout(attemptConnection,1000);
                        return;
                    }
                    console.log("Leader Added");
                    
                });
            }    

        app.get('/getPlays', (req, res) => {
            console.log("getting plays");
            const count = readFileSync('./count.txt', 'utf-8');
            console.log('getting count: ', String(count));

            res.send({
                plays: String(count)
            })

        });

        app.get('/addPlay', (req, res) => {

            const count = readFileSync('./count.txt', 'utf-8');
            const newCount = parseInt(count) + 1

            writeFileSync('./count.txt', String(newCount));
            console.log('new count: ', newCount);

        });
      //  con.release();
    }

});
//attemptConnection();

const attemptLB = () => {

    app.post('/addLeader', (req, res) => {
        var Name = req.body.name.name;
        var Score = req.body.score.score;
        console.log(req.body);
        //console.log(req.body.score.score);

        var addLeader ="INSERT INTO leaderboard (Name, Score) VALUES ('"+Name+"','"+Score+"');"
        dbpool.query(addLeader, function (err, result) {
            //con.release();
            if (err){
                console.log('Error connecting, retrying in 1 second');
                console.log(err.code);
            // if(con) con.destroy();
                setTimeout(attemptLB,1000);
                return;
            }else{
                console.log("Leader Added");
            }
            
        });
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
        dbpool.query(sort, function (err, result) {
           // con.release();
            if (err){
                console.log('Error connecting, retrying in 1 second');
                console.log(err.code);
                //if(con) con.destroy();
                setTimeout(attemptLB,1000);
                return;
            }
        });

        var getLeaders = 'SELECT * FROM leaderboard ORDER BY Score LIMIT 20;'
        var LBarr = [];
        var LB = [];
       
        dbpool.query(getLeaders, function (err, result) {   
           // con.release();
            if (err){
                console.log('Error connecting, retrying in 1 second');
                console.log(err.code);
              //  if(con) con.destroy();
                setTimeout(attemptLB,1000);
                return;
            }
        
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
                   ]      
                }
            );
              
        }); 
    }); 
}

    // dbpool.getConnection((err, con)=>{
    //     if(err){
    //         console.log('Error connecting, retrying in 1 second');
    //         console.log(err.code);
    //      //   if(con) con.destroy();
    //         setTimeout(attemptLB,1000);
    //         return;
    //     }else{
          
        
    //             res.send(
    //             `I received your POST request. This is what you sent me: ${req.body.name}`,
    //             );
    //             }
    //         });
             
           
    //     }

//attemptLB();

const attemptQuestions = () =>
    // dbpool.getConnection((err,con)=>{
    //     if (err){
    //         console.log('Error connecting, retrying in 1 second');
    //         console.log(err.code);
    //         if(con) con.destroy();
    //         setTimeout(attemptQuestions,1000);
    //         return;
    //     }
            
        app.get('/getQuestions', (req, res) => {
            var sentQs = [];
            var questionTotal = 26;
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
                        //console.log('loop doop');     
                    }
                   //console.log(randomNumber);
                   qNum.push(randomNumber);
                    sentQs.push(randomNumber);
                    if(sentQs.length>=questionTotal){
                        sentQs = [];
                    }
                }  
                console.log(qNum);
    
                var sql = 'SELECT * FROM questions WHERE ID in (' + mysql.escape(qNum[0]) + ','+ mysql.escape(qNum[1])+ ','+ mysql.escape(qNum[2])+ ','+ mysql.escape(qNum[3])+ ','+ mysql.escape(qNum[4])+ ','+ mysql.escape(qNum[5])+ ','+ mysql.escape(qNum[6])+ ','+ mysql.escape(qNum[7])+ ','+ mysql.escape(qNum[8])+ ','+ mysql.escape(qNum[9])+ ')';
                dbpool.query(sql, function (err, result) {  
                    //con.release();
                    if (err){
                        console.log('Error connecting, retrying in 1 second');
                        console.log(err.code);
                        setTimeout(attemptQuestions,1000);
                    }
    
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
              //  con.release();
       // }); 
    });
//attemptQuestions();


//INITIALIZE
attemptConnection(); 
attemptLB();
attemptQuestions();
//}
app.listen(port, () => console.log(`Listening on port ${port}`)); 
//while(TRUE)
