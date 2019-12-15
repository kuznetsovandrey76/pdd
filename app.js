const log = console.log
const chalk = require('chalk');

const mysql = require('mysql2');
const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});


let requestTime = function(req, res, next) {
    req.requestTime = new Date()
    next()
  }  
app.use(requestTime)


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
app.use(express.json({ limit: '1mb'}));
app.set("view engine", "pug");


// PAGES
app.get("/", function(req, res){

    let currentDate = {
        date: req.requestTime.getDate(),
        month: req.requestTime.getMonth(),
        year: req.requestTime.getFullYear(),
        hours: req.requestTime.getHours(),
        minutes: req.requestTime.getMinutes(),
        seconds: req.requestTime.getSeconds()
    }
    log(chalk.yellow(`connect... ${currentDate.date}-${currentDate.month}-${currentDate.year} ${currentDate.hours}:${currentDate.minutes}:${currentDate.seconds}`))

    const getQuestion = () => {

        db.query(`
        select question_id as q_id, 
            a.id as a_id, 
            question_text as q_text, 
            answer_text as a_text,
            image as have_image from questions q
        join answers a
        on q.id = a.question_id
        `, (err, data) => {
            if (err) throw err;

            let questions_to_pug = []
            let currentQuestionID = 1;

            let question = {
                q_text: null,
                q_id: currentQuestionID,
                have_image: 0,
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
                        have_image: 0,
                        a: []
                    }

                } 

                question.q_id = item.q_id                
                question.q_text = item.q_text
                question.have_image = item.have_image
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

app.get("/stat", function(req, res){
    res.render("stat");
});



// Middleware
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

app.post('/check-answer', (req, res) => {
    // Преобразуем data-question-id и data-answer-id в integer 
    const data = req.body;
    const question_id = data.questionID.split('-')[2];
    const answer_id = data.answerID.split('-')[2];

    // Запрос к БД
    db.promise().query(`
    select answer_id from rightAnswer 
    where question_id = ${question_id}`)
    .then( ([rows,fields]) => {
        try {
            return result = rows[0].answer_id == answer_id
        } catch(err) {
            log(chalk.red(err.message))
            return
        }
    })
    .then(( result ) => {
        // Возвращаем результат в main.js ('.question__answer'
        res.json({
            status: 'success',
            right_answer: result
        })
    })
    .catch((err) => log(err))
});

app.post('/update-answer-counter', (req, res) => {
    const data = req.body;
    const answer_id = data.answerID.split('-')[2];
    db.query(`
        UPDATE answers SET counter = counter + 1 
        WHERE id = ${answer_id}`)
});

app.get('/answer-data', (req, res) => {
        // Запрос к БД
        db.promise().query(`select id, counter from answers`)
        .then( ([rows,fields]) => {
            try {
                let addZero = (n) => n < 10 ? '0'+ n : n;                
                
                let result = [];

                for(let item of rows) {
                    result.push({id: addZero(item.id), counter: item.counter})
                }
                return result;
            } catch(err) {
                log(chalk.red(err.message))
                return
            }
        })
        .then(( result ) => {
            // Возвращаем результат в main.js - d3_data
            res.json({
                data: result
            })
        })
        .catch((err) => log(err))
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => log(`Server running... \n` + chalk.black.bgGreen(`http://localhost:${PORT}/`)));

