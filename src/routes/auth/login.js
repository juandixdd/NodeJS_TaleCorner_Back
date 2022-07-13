const express = require("express");
const router = express.Router();
const mySqlConnection = require("../../conexion");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/auth/login", async (req, res) => {
  function compare(email, password, userRegistered) {
    let compare = bcryptjs.compareSync(password, userRegistered[0].password);
    if (compare) {
      jwt.sign(
        {
          email: email,
          password: userRegistered[0].password,
        },
        "secretkey",
        (err, token) => {
          res.json({
            status: "Login exitoso",
            statusCode: 200,
            token: token,
          });
        }
      );
    } else {
      res.json({
        status: "Credenciales incorrectas",
        statusCode: 403,
      });
    }
  }

  const { email, password } = req.body;
  mySqlConnection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length >= 1) {
          compare(email, password, rows);
        } else {
          res.json({
            status: "No se encuentra ningún usuario registrado con ese email",
            statusCode: 403,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
