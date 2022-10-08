class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  getAll() {
    try {
      const data = fs.readFileSync(this.fileName, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log("Problemas al traer los productos del archivo!", error);
    }
  }
}

const fs = require("fs");
const fileName = "productos.json";
const file = new Contenedor(fileName);

const express = require("express");
const path = require("path");
const app = express();
const puerto = 8080;

const server = app.listen(puerto, () =>
  console.log("Server Arriba en puerto", puerto)
);

server.on("error", (error) => {
  console.log("Error en el servidor!", error);
});

app.get("/productos", (req, res) => {
  try {
    let products = file.getAll();

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

app.get("/productoRandom", (req, res) => {
  try {
    let products = file.getAll();

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
