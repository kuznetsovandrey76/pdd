$(document).ready(() => {
    let createQuestionBlock = (question_id) => {
        if (!question_id) return false;    
    
        let question_block = $('<div>', {
            class: 'question'
        })
    
        let question_text = $('<h2>', {
            class: 'question__text',
            text: `${question_id.text}`
        })
    
        let question_image = $('<img>', {
            class: 'question__image',
            src : `${question_id.image}` 
        })
    
      
        question_text.appendTo(question_block)
        question_image.appendTo(question_block)
        
        ANSWERS.filter((item) => {
            if (item.question_id == question_id.id) {
                let answer = $('<p>', {
                    class: 'question__answer',
                    text: `${item.text}`,
                })
                    .attr('data-question-id', question_id.id)
                    .attr('data-answer-id', item.id);
    
                answer.appendTo(question_block)
            }
        })
    
        question_block.appendTo('#root')
    
    }
    
    QUESTIONS.forEach(el => {
        createQuestionBlock(el)
    });
    
    $('.question__answer').on('click', (e) => {
        let select = e.target
        console.log($(select).attr('data-answer-id'))
        console.log($(select).attr('data-question-id'))
    })
})

