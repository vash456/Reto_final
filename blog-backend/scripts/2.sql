DROP TABLE IF EXISTS "POSTS";

CREATE TABLE "POSTS"(
    id serial primary key NOT NULL,
    title varchar(255),
	brief varchar(511),
	content text,
	image varchar(255),
	created_at timestamp default now(),
	status int default 1,
	user_id int not null,
    constraint fk_user
	    foreign key (user_id) references "USERS"(id)
);

INSERT INTO "POSTS"(TITLE, BRIEF, CONTENT, IMAGE, CREATED_AT, STATUS, USER_ID)
VALUES
    ('post1', 'brief1', 'conten1', 'image1.jpg', '2023/11/01 13:00:00', 1, 1),
    ('post2', 'brief2', 'conten2', 'image2.jpg', '2023/11/01 13:00:00', 1, 2),
    ('post3', 'brief3', 'conten3', 'image3.jpg', '2023/11/01 13:00:00', 1, 3),
    ('post4', 'brief4', 'conten4', 'image4.jpg', '2023/11/01 13:00:00', 1, 4),
    ('post5', 'brief5', 'conten5', 'image5.jpg', '2023/11/01 13:00:00', 1, 2),
    ('post6', 'brief6', 'conten6', 'image6.jpg', '2023/11/01 13:00:00', 1, 2),
    ('post7', 'brief7', 'conten7', 'image7.jpg', '2023/11/01 13:00:00', 1, 1);


SELECT * FROM "POSTS"