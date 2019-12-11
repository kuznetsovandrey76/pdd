const fs = require('fs');

const testFolder = './data/';

// Rename images
fs.readdirSync(testFolder).forEach(file => {
  let temp = file.slice(4, 9);
  let ticket = +temp.split('-')[0];
  let question = +temp.split('-')[1];
  let question_number = (ticket - 1) * 20 + question;
  fs.rename('./data/' + file, './data/' + question_number + '.jpg' , (err) => {
    if(err) console.log(err)
  })
})