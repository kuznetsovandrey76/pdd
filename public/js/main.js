$(document).ready(() => {
    $('.question_active .question__answer').on('click', async (e) => {
        let select = e.target

        $(select).parent().parent().toggleClass('question_active question_answered')

        let questionID = $(select).attr('data-question-id')
        let answerID = $(select).attr('data-answer-id')
        
        const data = { questionID, answerID }


        // Проверка правильности ответа
        const response = await fetch(`/check-answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Отправляем результаты в app.post('/check-answer'
            body: JSON.stringify(data)
        })        
        // Приходят результаты из app.post('/check-answer'
        const json = await response.json()
        
        if( json.right_answer ) {
            $(select).addClass('question__answer_right')
        } else {
            $(select).addClass('question__answer_wrong')
        } 
    })



    $('.question_active .question__answer').on('click', async (e) => {
        let select = e.target

        let answerID = $(select).attr('data-answer-id')

        fetch(`/update-answer-counter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Отправляем результаты в app.post('/update-answer-counter'
            body: JSON.stringify({ answerID })
        }) 
    });

    let d3_data = async () => {

        const response = await fetch(`/answer-data`, {})
        const json = await response.json()
        console.log(json.data)

        let data = json.data; 
        
        // Enter
        d3.select('.d3')
            .selectAll('div')
            .data(data)
            .enter()
            .append('div').attr('class', 'd3__item d-flex')


        // Update
        d3.select('.d3')
            .selectAll('.d3__item')
            .data(data)
            .append('div')
            .attr('class', 'd3__text')
            .text(function (d) {return d.id})

        d3.select('.d3')
            .selectAll('.d3__item')
            .data(data)
            .append('div').attr('class', function (d) {if (d.correct) { return 'd3__counter d3__counter_r'} else { return 'd3__counter d3__counter_w'}})
            .style('width', function (d) { return `${d.counter * 10}px`})
            .text(function (d) {return d.counter})
        
        // Exit
        d3.select('.d3')
            .selectAll('.d3__item')
            .data(data)
            .exit()
            .remove();
    }

    d3_data()

})
