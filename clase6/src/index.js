const Contenedor = require("./Contenedor.js");
const express = require("express");

const fileName = "productos.json";
const file = new Contenedor(fileName);

const app = express();
const puerto = 8080;

const server = app.listen(puerto, () =>
  console.log("Server Arriba en puerto", puerto)
);

server.on("error", (error) => {
  console.log("Error en el servidor!", error);
});

app.get("/productos", async (req, res) => {
  try {
    let products = await file.getAll();

    if (products.length == 0) {
      res.json({
        respuesta: "El archivo no tiene productos para mostrar",
      });
    } else {
      res.json({
        respuesta: products,
      });
    }
  } catch (error) {
    console.log("Problemas en el endpoint de productos!", error);
  }
});

app.get("/productoRandom", async (req, res) => {
  try {
    let products = await file.getAll();

    if (products.length == 0) {
      res.json({
        respuesta: "El archivo no tiene productos para mostrar",
      });
    } else {
      res.json({
        respuesta: products[Math.floor(Math.random() * products.length)],
      });
    }
  } catch (error) {
    console.log("Problemas en el endpoint de productoRandom!", error);
  }
});
