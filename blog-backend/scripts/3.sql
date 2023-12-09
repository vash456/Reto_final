DROP TABLE IF EXISTS "COMMENTS";

CREATE TABLE "COMMENTS"(
    id serial primary key NOT NULL,
    name varchar(255),
	comment varchar(255),
	email varchar(255),
	post_id int not null,
	created_at timestamp default now(),
	status int default 1,
    constraint fk_post
	    foreign key (post_id) references "POSTS"(id)
);

INSERT INTO "COMMENTS"(NAME, COMMENT, EMAIL, POST_ID, CREATED_AT, STATUS)
VALUES
    ('name1', 'comment1', 'email1@gmail.com', 1, '2023/11/01 11:00:00', 1),
    ('name2', 'comment2', 'email2@gmail.com', 2, '2023/11/02 12:00:00', 1),
    ('name3', 'comment3', 'email3@gmail.com', 3, '2023/11/03 13:00:00', 1),
    ('name4', 'comment4', 'email4@gmail.com', 1, '2023/11/04 14:00:00', 1),
    ('name5', 'comment5', 'email5@gmail.com', 1, '2023/11/05 15:00:00', 1),
    ('name6', 'comment6', 'email6@gmail.com', 1, '2023/11/06 16:00:00', 1),
    ('name7', 'comment7', 'email7@gmail.com', 2, '2023/11/07 17:00:00', 1),
    ('name8', 'comment8', 'email8@gmail.com', 2, '2023/11/08 18:00:00', 1),
    ('name9', 'comment9', 'email9@gmail.com', 1, '2023/11/09 19:00:00', 1),
    ('name10', 'comment10', 'email10@gmail.com', 1, '2023/11/10 20:00:00', 1);


SELECT * FROM "COMMENTS"