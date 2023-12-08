DROP TABLE IF EXISTS "USERS";

CREATE TABLE "USERS"(
    id serial primary key NOT NULL,
    name varchar(50),
	lastname varchar(50),
	username varchar(50),
	email varchar(255),
	password varchar(60),
	image varchar(255),
	status int default 1,
	kind int default 1, 
	created_at timestamp default now()
    
);

INSERT INTO "USERS"(NAME, LASTNAME, USERNAME, EMAIL, PASSWORD, IMAGE, STATUS, KIND, CREATED_AT)
VALUES
    ('user1', 'lastname1', 'username1', 'email1@gm.com', '123456','image1.jpg', '1', '1','2023/11/01 13:00:00'),
    ('user2', 'lastname2', 'username2', 'email2@gm.com', '123456','image2.jpg', '1', '1','2023/11/01 13:00:00'),
    ('user3', 'lastname3', 'username3', 'email3@gm.com', '123456','image3.jpg', '1', '1','2023/11/01 13:00:00'),
    ('user4', 'lastname4', 'username4', 'email4@gm.com', '123456','image4.jpg', '1', '1','2023/11/01 13:00:00');

SELECT * FROM "USERS"