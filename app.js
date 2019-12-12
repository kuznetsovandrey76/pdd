const chalk = require('chalk');

const mysql = require('mysql2');
const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});


const log = console.log

function reconnect_db(){
  let db = mysql.createPool({
    connectionLimit : 10,
    host     : 'akuznetsov.beget.tech',
    user     : 'akuznetsov_pdd',
    database : 'akuznetsov_pdd',
    password : '***' // ИЗМЕНИТЬ
  });
  db.on('error', function(err){
      log(err.code);
  if(err.code == 'PROTOCOL_CONNECTION_LOST') db = reconnect_db();
  else throw err;
});
return db;
}

let db = reconnect_db();


app.set("view engine", "pug");

app.get("/", function(req, res){

    db.promise()
        .query(`
            select answer_text from questions q
            join answers a
            on q.id = a.question_id
            where q.id = 1
            `)
        .then(([rows, fields]) => {
            let answers = [];
            for (let item of rows) {
                answers.push(item.answer_text)
            }

            log(answers)
            // return answers
        })
        // .then((answers) => {
        //     log(answers[0][0])
        // })
        .catch((err) => {
            log(err)
        })


    // let getAnswers = () => {
    //     db.query(`
    //     select answer_text from questions q
    //     join answers a
    //     on q.id = a.question_id
    //     where q.id = 1
    //     `, (err, answers) => {
    //         if(err) return log(err);
    //         // res.render("index", {
    //         //     data: data
    //         // });
    //         // log(answers)
    //         return answers;
    //       });
    // }


});


app.get("/add", function(req, res){
    res.render("add");
});


app.post("/add-question", urlencodedParser, function (req, res) {
         
    if(!req.body) return res.sendStatus(400);
    const   block_number = Number(req.body.block_number),
            image = req.body.image ? Number(req.body.image) : 0,
            question_text = req.body.question_text;

    // log(block_number, image, question_text)
            
    db.query("INSERT INTO questions (block_number, image, question_text) VALUES (?, ?, ?)", [block_number, image, question_text], function(err, data) {
      if(err) return log(err);
      res.redirect("/add");
    });
});
 

app.post("/add-answer", urlencodedParser, function (req, res) {
         
    if(!req.body) return res.sendStatus(400);
    const   question_id = Number(req.body.question_id),
            correct = req.body.correct ? Number(req.body.correct) : 0,
            answer_text = req.body.answer_text;

    // log(question_id, correct, answer_text)
            
    db.query("INSERT INTO answers (question_id, correct, answer_text) VALUES (?, ?, ?)", [question_id, correct, answer_text], function(err, data) {
      if(err) return log(err);
      res.redirect("/add");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => log(`Server running... \n` + chalk.black.bgGreen(`http://localhost:${PORT}/`)));

