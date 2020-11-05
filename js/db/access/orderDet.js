const db = require("../index");

const createOrder = async (body) => {
    //console.log(body);
  return await db.sequelize.query(
    `INSERT INTO ORDERDETAILS (quantity, orderId, productId) VALUES (${body.quantity}, ${body.id_order}, ${body.id_product});`,
    { type: db.sequelize.QueryTypes.INSERT }
  );
};

const deleteOr = async (orderId) => {
  return await db.sequelize.query(
    `DELETE FROM ORDERDETAILS WHERE ORDERID = ${orderId};`,
    { type: db.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
    createOrder,
    deleteOr
};