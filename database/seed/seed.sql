BEGIN TRANSACTION;

INSERT INTO users (name, email, usecount, joined) VALUES ('Jessie', 'jessie@gmail.com', 5, '2018-01-24');
INSERT INTO users (name, email, usecount, joined) VALUES ('James', 'james@gmail.com', 2, '2018-06-17');
INSERT INTO users (name, email, usecount, joined) VALUES ('Jamie', 'jamie@gmail.com', 17, '2018-08-08');
INSERT INTO users (name, email, usecount, joined) VALUES ('Jane', 'jane@gmail.com', 8, '2018-11-03');

INSERT INTO login (email, password) VALUES ('jessie@gmail.com', '$2y$10$HiqceEbcNAw5zFGjTlkXcuau5A.Mhd4z81wdubftYRATmrvDwDIDa');
INSERT INTO login (email, password) VALUES ('james@gmail.com', '$2y$10$aDQ0s7055c8Ou1NWIKQxceg7nO6PyMQZfCOu3ohQ.eFKcuTsXDhDC');
INSERT INTO login (email, password) VALUES ('jamie@gmail.com', '$2y$10$nAfhfc72TEpyvQdDLUtNjusFavL7Ts2lwsihRWGmavsoziYQgZQV6');
INSERT INTO login (email, password) VALUES ('jane@gmail.com', '$2y$10$0294Xvck7IGy1wTzvY9RG.6aJ8M/skRXqbxXvIPYzO/pbutM49o/e');

COMMIT;