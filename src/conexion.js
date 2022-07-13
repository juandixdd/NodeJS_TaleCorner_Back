const mysql = require("mysql");

const mySqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tale_corner",
});

mySqlConnection.connect(function (err) {
  if (err) {
    console.log(err);
    console.log("Error de conexión a la base de datos")
    return;
  } else {
    console.log("Conexión a la base de datos establecida");
  }
});

module.exports = mySqlConnection;