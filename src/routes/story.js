const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

router.get("/story", (req, res) => {
  mySqlConnection.query("SELECT * FROM story", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

router.get("/story/fulldata", (req, res) => {
  mySqlConnection.query(
    "select s.*, concat(a.names, ' ', a.last_names) as author, concat(u.names, ' ', u.last_names) as user from story s join author a on s.id_author = a.id join users u on u.id = s.id_user ",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/story/:id", (req, res) => {
  const { id } = req.params;
  mySqlConnection.query(
    "SELECT * FROM story WHERE id = ?",
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

router.post("/story", (req, res) => {
  const { title, content, creation_date, id_user, id_author } = req.body;
  mySqlConnection.query(
    "INSERT INTO story (title,content,creation_date,id_user,id_author) VALUES (?,?,?,?,?)",
    [title, content, creation_date, id_user, id_author],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Cuento creado", statusCode: 200 });
      } else {
        console.log(err);
      }
    }
  );
});

router.put("/story/:id", (req, res) => {
  const { title, content, creation_date, id_user, id_author } = req.body;
  const { id } = req.params;
  mySqlConnection.query(
    "UPDATE story SET title = ?,content = ?,creation_date = ?,id_user = ?,id_author = ? WHERE id = ?",
    [title, content, creation_date, id_user, id_author, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Cuento actualizado" });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete("/story/:id", (req, res) => {
  const { id } = req.params;
  mySqlConnection.query(
    "DELETE FROM story WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Cuento eliminado" });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
