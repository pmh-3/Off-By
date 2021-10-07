const { query } = require('express');
const express = require('express'); 
var mysql = require('mysql');

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
    
    con.query("CREATE DATABASE obdb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });

    var sql = "DROP TABLE questions";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
    });
   
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

    var addLeader ="INSERT INTO leaderboard (Name, Score) VALUES ('Waffler','0');"
    con.query(addLeader, function (err, result) {
        if (err) throw err;
        console.log("Leader Added");
    });

    for(let i = 0; i<20; i++){
        var addLeader ="INSERT INTO leaderboard (Name, Score) VALUES ('_____','100');"
        con.query(addLeader, function (err, result) {
            if (err) throw err;
            console.log("Leader Added");
        });
    }    
        
});

