CREATE DATABASE spoolDB;

use spoolDB;

CREATE TABLE user(userID int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT, userName varchar(255) NOT NULL, password varchar(255) NOT NULL, isAdmin tinyint(1));

CREATE TABLE project(projectID int(11) PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, github varchar(255) NOT NULL);

CREATE TABLE usersInProject(linkID int(11) PRIMARY KEY AUTO_INCREMENT, projectID int(11) NOT NULL, userID int(11) NOT NULL, userName varchar(255) NOT NULL);

CREATE TABLE task(taskID int(11) PRIMARY KEY AUTO_INCREMENT, taskName varchar(255) NOT NULL, date DATETIME(0) NOT NULL, description varchar(1000) NOT NULL, projectID int(11) NOT NULL, status tinyint(1) NOT NULL);

ALTER TABLE usersInProject ADD FOREIGN KEY (userID) references user(userID);

ALTER TABLE usersInProject ADD FOREIGN KEY(projectID) references project(projectID);

ALTER TABLE task ADD FOREIGN KEY(projectID) references project(projectID);