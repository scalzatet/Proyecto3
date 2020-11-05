const Sequelize = require("sequelize");
const db = {};


const sequelize = new Sequelize("dbresto", "root", "ejemplo_password", {
  dialect: "mysql",
  port: "3307", /////////ACLARAR EN README///////////////
  host: "127.0.0.1"
});


db.sequelize = sequelize;

sequelize.authenticate().then(()=>{
  console.log('Está conectado OK');
}).catch(err=>{
  console.log(err);
});

module.exports = db;