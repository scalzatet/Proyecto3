const Sequelize = require("sequelize");
const db = {};

//const database = new Sequelize("mysql://root:@localhost:3307/delilahresto");

const sequelize = new Sequelize("dbproyecto", "root", "lala2280_", {
  dialect: "mysql",
  host: "localhost",
});

db.sequelize = sequelize;
//database.Sequelize = Sequelize;

module.exports = db;