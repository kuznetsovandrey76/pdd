const addQuestion = (id, block_number, image, text, comment, ...answer_id) => {
    // ex. addQuestion(1, 1, '100.jpg', '...', '...', 1, 2, 3)
    return {
        id: id,
        block_number: block_number,
        image: image,
        text: text,
        comment: comment,
        answer_id: [...answer_id]
    }
}

const addAnswer = (id, question_id, text, correct) => {
    // ex. addAnswer(1, 1, '...', true)
    return {
        id: id,
        question_id: question_id,
        text: text,
        correct: correct
    }
}

const addThemes = (id, text, ...question_id) => {
       // ex. addThemes(1, '...', 1, 2, 3)
       return {
        id: id,
        text: text,
        question_id: [...question_id]
    } 
}

const addTickets = (id, ...question_id) => {
    // ex. addThemes(1, 1, 2, 3)
    return {
     id: id,
     question_id: [...question_id]
 } 
}


const ANSWERS = [
    '',
    addAnswer(1, 1, 'Остановившись на проезжей части из-за технической неисправности транспортного средства', true),
    addAnswer(2, 1, 'Остановившись непосредственно перед пешеходным переходом, чтобы уступить дорогу пешеходу', false),
    addAnswer(3, 1, 'В обоих перечисленных случаях', false),
    addAnswer(4, 2, 'Разрешен', true),
    addAnswer(5, 2, 'Разрешен только при технической неисправности транспортного средства', false),
    addAnswer(6, 2, 'Запрещен', false),
    addAnswer(7, 3, 'Можно', true),
    addAnswer(8, 3, 'Можно, если Вы управляете такси', false),
    addAnswer(9, 3, 'Нельзя', false),
    // addAnswer(, , '', false),
]

const QUESTIONS = [
    '',
    addQuestion(1, 1, '', 'В каком случае водитель совершит вынужденную остановку?', '...', 1, 2, 3),
    addQuestion(2, 1, '2.jpg', 'Разрешен ли Вам съезд на дорогу с грунтовым покрытием?', '...', 4, 5, 6),
    addQuestion(3, 1, '3.jpg', 'Можно ли Вам остановиться в указанном месте для посадки пассажира?', '...', 7, 8, 9),
    // addQuestion(, , '.jpg', '', '...', ),
]

const TICKETS = [
    '',
    addTickets(1, 1, 2)
]


const trueAnswer = (question_id) => {
    return `№ ${question_id}
Вопрос: ${QUESTIONS[question_id].text}
Ответ: ${ANSWERS[QUESTIONS[question_id].answer_id[0]].text}`
}

