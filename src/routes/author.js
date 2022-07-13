const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Get
router.get("/author", (req, res) => {
  mySqlConnection.query("SELECT * FROM author", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//? Get by id
router.get("/author/:id", (req, res) => {
  const { id } = req.params;
  mySqlConnection.query(
    "SELECT * FROM author WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//? Create
router.post("/author", (req, res) => {
  const {
    names,
    last_names,
    birth_city,
    birth_country,
    birth_date,
    biography,
  } = req.body;
  mySqlConnection.query(
    "INSERT INTO author ( names, last_names, birth_city, birth_country, birth_date, biography) VALUES (?,?,?,?,?,?)",
    [ names, last_names, birth_city, birth_country, birth_date, biography],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Autor creado", statusCode: 200 });
      } else {
        console.log(err);
      }
    }
  );
});

// Edit
router.put("/author/:id", (req, res) => {
    const { names, last_names, birth_city, birth_country, birth_date, biography } = req.body;
    const { id } = req.params;
    mySqlConnection.query(
      "UPDATE author SET names = ?, last_names = ?,birth_city = ?,birth_country = ?,birth_date = ?,biography = ? WHERE id = ?",
      [names, last_names, birth_city, birth_country, birth_date, biography,id],
      (err, rows, fields) => {
        if (!err) {
          res.json({ status: "Autor actualizado" });
        } else {
          console.log(err);
        }
      }
    );
  });



module.exports = router;