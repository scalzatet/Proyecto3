const db = require("../index");

const findUser = async (body) => {
    //console.log('findUser');
    let datos =  await db.sequelize.query(
        `SELECT * FROM USERS WHERE USER = "${body.user}";`,
        { type: db.sequelize.QueryTypes.SELECT });
    return datos;
};

const createUser = async (body) => {
  //console.log('Entrò a createUser');
  return await db.sequelize.query(
    `INSERT INTO USERS (user, nameu, email, cellphone, adress, password, roleId) 
     VALUES ("${body.user}","${body.nameu}","${body.email}","${body.cellphone}", "${body.adress}", "${body.password}", ${body.roleId});`,
    { type: db.sequelize.QueryTypes.INSERT }
  );
};
 

module.exports = {
  findUser,
  createUser
};