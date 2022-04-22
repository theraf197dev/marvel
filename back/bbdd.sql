DROP DATABASE IF EXISTS dbMarvelComics;

CREATE DATABASE dbMarvelComics;
USE dbMarvelComics;

DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Rate;
DROP TABLE IF EXISTS Upvote;
DROP TABLE IF EXISTS Comment;

CREATE TABLE User (
    userId int AUTO_INCREMENT,
    username varchar(100) NOT NULL,
    PRIMARY KEY (userId)
);

CREATE TABLE Rate (
    id int AUTO_INCREMENT,
    userId int NOT NULL,
    heroId int NOT NULL,
    rate float NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE Upvote (
    id int AUTO_INCREMENT,
    userId int NOT NULL,
    heroId int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE Comment (
    id int AUTO_INCREMENT,
    userId int NOT NULL,
    heroId int NOT NULL,
    comment varchar(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES User(userId)
);