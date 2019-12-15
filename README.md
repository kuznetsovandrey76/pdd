for_node.js - Переименовываем файлы
download_images_from_web.html - скачать все изображения со стороннего сайта

create table questions(
    id int auto_increment,
    block_number int not null,
    image boolean not null, 
    question_text text not null,
    primary key (id)
);

create table answers(
    id int auto_increment,
    question_id int not null, 
    answer_text text not null,
    correct boolean not null,
    foreign key(question_id) references questions(id),
    primary key (id)
);

ALTER TABLE answers ADD counter INT NOT NULL default 0 AFTER correct;

Очистить данные в одном из столбцов таблицы
UPDATE answers SET counter = 0;

INSERT INTO questions (block_number, image, question_text) VALUES (1, 0, 'В каком случае водитель совершит вынужденную остановку?');

Заглушка
INSERT INTO questions (id, block_number, image, question_text) VALUES (801, 5, 0, 'egg')


INSERT INTO questions (block_number, image, question_text) VALUES 
(2, 0, 'Что означает мигание зеленого сигнала светофора?'),
(2, 0, 'Водитель обязан подавать сигналы световыми указателями поворота (рукой)?'),
(2, 1, 'Как Вам следует поступить при повороте направо?'),
(2, 1, 'По какой траектории Вам разрешено выполнить разворот?'),
(2, 1, 'С какой скоростью Вы можете продолжить движение вне населенного пункта по левой полосе на легковом автомобиле?')
;

INSERT INTO answers (question_id, answer_text, correct, counter) VALUES
(4, 'Только Б.', 0, 0), 
(4, 'В и Г.', 0, 0), 
(4, 'Все.', 1, 0), 
(5, 'Перед знаком.', 0, 0), 
(5, 'Перед перекрестком у линии разметки.', 1, 0), 
(5, 'На перекрестке перед прерывистой линией разметки.', 0, 0), 
(5, 'В любом месте по усмотрению водителя.', 0, 0);

Заглушка
INSERT INTO answers (id, question_id, answer_text, correct, counter) VALUES (10000, 801, 'egg', 0, 0);


create table rightAnswer(
    id int auto_increment,
    question_id int not null,
    answer_id int not null,
    primary key (id)
);

INSERT INTO rightAnswer (question_id, answer_id) VALUES (1, 2);