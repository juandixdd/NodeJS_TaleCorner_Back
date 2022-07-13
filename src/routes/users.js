const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");
const bcryptjs = require("bcryptjs");

//? Traer todos los usuarios =====================================================================================
router.get("/users", (req, res) => {
  mySqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//? Traer a un usuario por id =====================================================================================
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  mySqlConnection.query(
    "SELECT * FROM users WHERE id = ?",
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

//? Crear un usuario =====================================================================================
router.post("/users", (req, res) => {
  //* Se define función para creación del usuario
  function createUser() {
    const {
      names,
      last_names,
      birth_city,
      birth_country,
      birth_date,
      email,
      password,
    } = req.body;
    mySqlConnection.query(
      "INSERT INTO users ( names, last_names, birth_city, birth_country, birth_date, email, password) VALUES (?,?,?,?,?,?,?)",
      [
        names,
        last_names,
        birth_city,
        birth_country,
        birth_date,
        email,
        bcryptjs.hashSync(password, 10),
      ],
      (err, rows, fields) => {
        if (!err) {
          res.json({ status: "Usuario creado", statusCode: 200 });
        } else {
          console.log(err);
        }
      }
    );
  }

  //* Validación para ver si el id existe en la base de datos
  const { email } = req.body;
  mySqlConnection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length >= 1) {
          res.json({
            status: "Ya hay un usuario registrado con ese email",
            statusCode: 403,
          });
        } else {
          //* Si no hay usuarios registrados con el id, lo deja crear
          createUser();
        }
      } else {
        console.log(err);
      }
    }
  );
});

//?Editar un usuario =====================================================================================
router.put("/users/:id", (req, res) => {
  const { name, last_name, email, password, adress, phone } = req.body;
  const { id } = req.params;
  mySqlConnection.query(
    "UPDATE users SET name = ?, last_name = ?, email = ?, password = ?, adress = ?, phone = ? WHERE id = ?",
    [name, last_name, email, password, adress, phone, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Usuario actualizado" });
      } else {
        console.log(err);
      }
    }
  );
});

//?Eliminar un usuario =====================================================================================
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  mySqlConnection.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Usuario eliminado" });
      } else {
        console.log(err);
      }
    }
  );
});
module.exports = router;
