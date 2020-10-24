const db = require("../index");
const mysql = require('mysql2');

const findUser = async (body) => {
    console.log('Entrós');
    return await db.sequelize.query(
        `SELECT * FROM USERS WHERE USER = "${body.user}";`,
        { type: db.sequelize.QueryTypes.SELECT });
};

/* const createUser = async (body) => {
  return await database.sequelize.query(
    `INSERT INTO USERS (email, password, username, fullname, cellphone, shippingAddress, roleId) 
     VALUES ("${body.email}","${body.password}","${body.username}","${body.fullname}", "${body.cellphone}", "${body.shippingAddress}", ${body.roleId});`,
    { type: database.sequelize.QueryTypes.INSERT }
  );
};
 */
module.exports = {
  findUser
  //createUser,
};