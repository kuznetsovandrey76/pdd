// addQuestion: object
const addQuestion = (id, block_number, image, text) => { // + comment
    // ex. addQuestion(1, 1, true, '...')
    return {
        id: id,
        block_number: block_number,
        image: image ? `./data/${id}.jpg` : false,
        text: text
    }
}

// addAnswer: object
const addAnswer = (id, question_id, text, correct) => {
    // ex. addAnswer(1, 1, '...', true)
    return {
        id: id,
        question_id: question_id,
        text: text,
        correct: correct
    }
}

const addThemes = (id, text) => {
       // ex. addThemes(1, '...')
       return {
        id: id,
        text: text
    } 
}


const ANSWERS = [
    '',
    addAnswer(1, 1, 'Остановившись непосредственно перед пешеходным переходом, чтобы уступить дорогу пешеходу.', false),
    addAnswer(2, 1, 'Остановившись на проезжей части из-за технической неисправности транспортного средства.', true),
    addAnswer(3, 1, 'В обоих перечисленных случаях.', false),
    addAnswer(4, 2, 'Разрешен.', true),
    addAnswer(5, 2, 'Разрешен только при технической неисправности транспортного средства.', false),
    addAnswer(6, 2, 'Запрещен.', false),
    addAnswer(7, 3, 'Можно.', true),
    addAnswer(8, 3, 'Можно, если Вы управляете такси.', false),
    addAnswer(9, 3, 'Нельзя.', false),
    addAnswer(10, 4, 'Только А.', false),
    addAnswer(11, 4, 'Только Б.', false),
    addAnswer(12, 4, 'В и Г.', false),
    addAnswer(13, 4, 'Все.', true),
    addAnswer(14, 5, 'Перед знаком.', false),
    addAnswer(15, 5, 'Перед перекрестком у линии разметки.', true),
    addAnswer(16, 5, 'На перекрестке перед прерывистой линией разметки.', false),
    addAnswer(17, 5, 'В любом месте по усмотрению водителя.', false),
    // addAnswer(, , '', false),
]


const QUESTIONS = [
    '',
    addQuestion(1, 1, false, 'В каком случае водитель совершит вынужденную остановку?'),
    addQuestion(2, 1, true, 'Разрешен ли Вам съезд на дорогу с грунтовым покрытием?'),
    addQuestion(3, 1, true, 'Можно ли Вам остановиться в указанном месте для посадки пассажира?'),
    addQuestion(4, 1, true, 'Какие из указанных знаков запрещают движение водителям мопедов?'),
    addQuestion(5, 1, true, 'Вы намерены повернуть налево. Где следует остановиться, чтобы уступить дорогу легковому автомобилю?'),
    // addQuestion(, , '.jpg', '', '...', ),
]



// trueAnswer: string
const trueAnswer = (id) => {
    let _answer = ANSWERS.find((item) => {
        return item.question_id == id && item.correct
    })

    return `№ ${id}
Вопрос: ${QUESTIONS[id].text}
Ответ: ${_answer.text}`
}

