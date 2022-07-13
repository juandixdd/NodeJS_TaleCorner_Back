const express = require("express");
const router = express.Router();

const html =
  "<div style='display: flex; justify-content: center; align-items: center; margin-top: 30vh; font-family: 'Courier New', Courier, monospace; margin-left: 200px; margin-right: 200px;'><h3>¡Hola!, Bienvenido a la ApiREST del proyecto TaleCorner. <br><br> Esta ApiREST hace las respectivas consultas a la base de datos para enviar los datos al front e interpretarlos, para ingresar a las diferentes tablas, por favor ingrese a las Api.</h3></div>";

router.get("/", (req, res) => {
  res.send(html);
});

module.exports = router; //super importante poner esto porque si no paila la app
