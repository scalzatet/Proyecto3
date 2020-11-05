const db = require("../index");


const createOrder = async (body) => {
    return await db.sequelize.query(
      `INSERT INTO ORDERS (userId, statusId, typepaymentId) VALUES (${body.userId}, 1, ${body.typepaymentId});`,
      { type: db.sequelize.QueryTypes.INSERT }
    );
};

/////
const findDetOrder = `SELECT ORDERS.id AS orderId,  
STATUS.id AS statusId, STATUS.description AS STATUS,
TYPEPAYMENT.id AS typepaymentId, TYPEPAYMENT.description AS typepayment,
ORDERDETAILS.quantity AS quantity,
PRODUCTS.id AS productId, PRODUCTS.description AS product, PRODUCTS.price as price,
USERS.id AS userId, USERS.nameu AS fullname, USERS.email AS email, USERS.cellphone AS cellphone, USERS.adress AS address,
ROLES.id AS roleId, ROLES.description AS role
FROM ORDERS ORDERS
INNER JOIN STATUS STATUS
ON ORDERS.statusId = STATUS.id
INNER JOIN TYPEPAYMENT TYPEPAYMENT
ON ORDERS.typepaymentId = TYPEPAYMENT.id
INNER JOIN ORDERDETAILS ORDERDETAILS
ON ORDERS.id = ORDERDETAILS.orderId
INNER JOIN PRODUCTS PRODUCTS
ON ORDERDETAILS.productId = PRODUCTS.id
INNER JOIN USERS USERS
ON ORDERS.userId = USERS.id
INNER JOIN ROLES ROLES
ON USERS.roleId = ROLES.id`; 

const findAll = async () => {
    return await db.sequelize.query(findDetOrder, {
      type: db.sequelize.QueryTypes.SELECT,
    });
};

const findAllById = async (userId) => {
    return await db.sequelize.query(
      `${findDetOrder} WHERE USERS.id = ${userId};`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
};

 const findById = async (id) => {
    return await db.sequelize.query(
      `${findDetOrder} WHERE ORDERS.id = ${id};`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
};

const findByIdandUser = async (id, userId) => {
    return await db.sequelize.query(
      `${findDetOrder} WHERE ORDERS.id = ${id} AND  USERS.id = ${userId}`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
};

const updateStatus = async (id, statusId) => {
    return await db.sequelize.query(
      `UPDATE ORDERS SET statusId = ${statusId}  WHERE ID = ${id};`,
      { type: db.sequelize.QueryTypes.UPDATE }
    );
};

const deleteOr = async (id) => {
    return await db.sequelize.query(
      `DELETE FROM ORDERS WHERE ID = ${id};`,
      { type: db.sequelize.QueryTypes.DELETE }
    );
};
 
module.exports = {
    createOrder,
    findAll,
    findAllById,
    findById,
    findByIdandUser,
    updateStatus,
    deleteOr
};

