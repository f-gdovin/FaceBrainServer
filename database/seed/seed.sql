BEGIN TRANSACTION;

INSERT INTO users (name, email, usecount, joined) VALUES ('Jessie', 'jessie@gmail.com', 5, '2018-01-24');
INSERT INTO users (name, email, usecount, joined) VALUES ('James', 'james@gmail.com', 2, '2018-06-17');
INSERT INTO users (name, email, usecount, joined) VALUES ('Jamie', 'jamie@gmail.com', 17, '2018-08-08');
INSERT INTO users (name, email, usecount, joined) VALUES ('Jane', 'jane@gmail.com', 8, '2018-11-03');

INSERT INTO login (email, password) VALUES ('jessie@gmail.com', '$2a$10$OE2SufUCrKk0mBkPaZL2Ju1j6bb4ZEcP9sE6T7CfQCv/taf3FofSC');
INSERT INTO login (email, password) VALUES ('james@gmail.com', '$2a$10$OE2SufUCrKk0mBkPaZL2Ju1j6bb4ZEcP9sE6T7CfQCv/taf3FofSC');
INSERT INTO login (email, password) VALUES ('jamie@gmail.com', '$2a$10$OE2SufUCrKk0mBkPaZL2Ju1j6bb4ZEcP9sE6T7CfQCv/taf3FofSC');
INSERT INTO login (email, password) VALUES ('jane@gmail.com', '$2a$10$OE2SufUCrKk0mBkPaZL2Ju1j6bb4ZEcP9sE6T7CfQCv/taf3FofSC');

COMMIT;