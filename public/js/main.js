$(document).ready(() => {
    $('.question__answer').on('click', async (e) => {
        let select = e.target

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
            $(select).addClass('answer__right')
        } else {
            $(select).addClass('answer__wrong')
        } 
    })



    $('.question__answer').on('click', async (e) => {
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
            .append('div').attr('class', 'd3__counter')
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
