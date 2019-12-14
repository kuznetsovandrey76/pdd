$(document).ready(() => {
    $('.question__answer').on('click', async (e) => {
        let select = e.target

        let questionID = $(select).attr('data-question-id')
        let answerID = $(select).attr('data-answer-id')
        
        const data = { questionID, answerID }

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
        // console.log(select)
        // console.log(json.right_answer)

    })
})
