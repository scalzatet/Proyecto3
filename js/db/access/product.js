const db = require("../index");

const createProduct = async (body) => {
    return await db.sequelize.query(
      `INSERT INTO PRODUCTS (description, price) VALUES ("${body.description}", ${body.price});`,
      { type: db.sequelize.QueryTypes.INSERT }
    );
};

const findProducts = async () => {
    return await db.sequelize.query(`SELECT * FROM PRODUCTS`, {
      type: db.sequelize.QueryTypes.SELECT,
    });
};

const findProductDescription = async (body) => {
    let datos =  await db.sequelize.query(
        `SELECT * FROM PRODUCTS WHERE DESCRIPTION = "${body.description}";`,
        { type: db.sequelize.QueryTypes.SELECT });
    return datos;
};

const findProductId = async (id) => {
  
    return await db.sequelize.query(
      `SELECT * FROM PRODUCTS WHERE ID = ${id};`,
      {type: db.sequelize.QueryTypes.SELECT}
    );
};


const findProductByIds = async (productId) => {
  console.log("aca too " + productId);
  return await db.sequelize.query(
    `SELECT * FROM PRODUCTS WHERE ID IN (${productId});`,
    {
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
};
  
  const upd = async (id, body) => {
    return await db.sequelize.query(
      `UPDATE PRODUCTS SET DESCRIPTION = "${body.description}", PRICE = ${body.price} WHERE ID = ${id};`,
      { type: db.sequelize.QueryTypes.UPDATE }
    );
};

  const deleteP = async (id) => {
    return await db.sequelize.query(
      `DELETE FROM PRODUCTS WHERE ID = ${id};`,
      { type: db.sequelize.QueryTypes.DELETE }
    );
  };


  module.exports = {
    createProduct,
    findProducts,
    findProductDescription,
    findProductId,
    findProductByIds,
    upd,
    deleteP
  };