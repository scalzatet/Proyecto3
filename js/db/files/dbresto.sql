CREATE SCHEMA IF NOT EXISTS dbresto;

use dbresto;

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

INSERT INTO products 
(description, price) 
VALUES ("Ensalada Cesar",25000), ("Hamburguesa con papas", 20000), ("Punta de anca", 22000);



CREATE TABLE IF NOT EXISTS status (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

INSERT INTO status (description) VALUES ('Pedido Nuevo'), ('Pedido Confirmado'), ('Preparando Pedido'), ('Pedido Enviado'), ('Pedido Entregado'), ('Pedido Cancelado');

CREATE TABLE IF NOT EXISTS typepayment (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

INSERT INTO typepayment (description) VALUES ('Efectivo'), ('Transferencia'), ('T Crédito'), ('T Débito');

CREATE TABLE IF NOT EXISTS orders (
  id int NOT NULL AUTO_INCREMENT,
  /* date datetime DEFAULT CURRENT_TIMESTAMP, */
  userId int DEFAULT NULL,
  statusId int DEFAULT NULL,
  typepaymentId int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY userId (userId),
  KEY statusId (statusId),
  KEY typepaymentId (typepaymentId),
  CONSTRAINT orders_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT orders_ibfk_2 FOREIGN KEY (statusId) REFERENCES status (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT orders_ibfk_3 FOREIGN KEY (typepaymentId) REFERENCES typepayment (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE IF NOT EXISTS orderdetails (
  quantity int NOT NULL,
  orderId int DEFAULT NULL,
  productId int DEFAULT NULL,
  KEY orderId (orderId),
  KEY productId (productId),
  CONSTRAINT orderdetails_ibfk_1 FOREIGN KEY (orderId) REFERENCES orders (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT orderdetails_ibfk_2 FOREIGN KEY (productId) REFERENCES products (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
