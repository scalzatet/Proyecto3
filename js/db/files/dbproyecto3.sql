CREATE SCHEMA IF NOT EXISTS dbproyecto;

use dbproyecto;

CREATE TABLE IF NOT EXISTS roles (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles (description) VALUES ('client'), ('admin');

CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT,
    user varchar(255) NOT NULL,
    nameu varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    cellphone varchar(255) NOT NULL,
    adress varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    roleId int DEFAULT NULL,
    PRIMARY KEY (id),
    KEY roleId (roleId),
    CONSTRAINT users_ibfk_1 FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users 
(user, nameu, email, cellphone, adress, password, roleId) 
VALUES ("scalzatet","Sarah Alzate","sarah@correo.com","34245","Calle 45 # 23","adminSA", 2);

CREATE TABLE IF NOT EXISTS products (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    price decimal(10,0) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;