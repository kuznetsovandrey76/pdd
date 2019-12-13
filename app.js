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

app.use(express.static(__dirname + '/public'));
app.set("view engine", "pug");


app.get("/", function(req, res){

    const getQuestion = () => {

        db.query(`
        select question_id as q_id, 
            a.id as a_id, 
            question_text as q_text, 
            answer_text as a_text from questions q
        join answers a
        on q.id = a.question_id
        `, (err, data) => {
            if (err) throw err;

            let questions_to_pug = []
            let currentQuestionID = 1;

            let question = {
                q_text: null,
                q_id: currentQuestionID,
                a: []
            }

            for(let item of data) { 
                if (item.q_id > currentQuestionID) {
                    currentQuestionID += 1

                    // Для последнего вопроса нужна заглушка
                    // Пустой ответ 801 вопроса
                    questions_to_pug.push(question)    

                    // RESET question
                    question = {
                        q_text: null,
                        q_id: currentQuestionID,
                        a: []
                    }

                } 

                question.q_id = item.q_id                
                question.q_text = item.q_text
                question.a.push({ q_id: item.q_id, 
                    a_id: item.a_id, 
                    a_text: item.a_text})
                
            }
            res.render("index", {
                data: questions_to_pug
            });
        })
    }

    getQuestion()


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

