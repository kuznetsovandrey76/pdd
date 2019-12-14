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

INSERT INTO questions (block_number, image, question_text) VALUES (1, 0, 'В каком случае водитель совершит вынужденную остановку?');


create table rightAnswer(
    id int auto_increment,
    question_id int not null,
    answer_id int not null,
    primary key (id)
);

INSERT INTO rightAnswer (question_id, answer_id) VALUES (1, 2);