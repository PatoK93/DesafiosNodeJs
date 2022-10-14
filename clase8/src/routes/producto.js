const express = require("express");
const router = express.Router();
const Producto = require("../clases/Producto");

const arrayProductos = [
  new Producto(
    1,
    "auto",
    100,
    "https://img.freepik.com/vector-premium/ilustracion-dibujos-animados-sedan-azul-coche-generico-objeto-color-vehiculo-transporte-auto-contemporaneo-transporte-personal-moderno-automovil-urbano-sobre-fondo-blanco_151150-2409.jpg?w=2000"
  ),
  new Producto(
    2,
    "moto",
    200,
    "https://img.freepik.com/vector-gratis/ilustracion-motocicleta-color-rojo_1308-35859.jpg?w=2000&t=st=1665714076~exp=1665714676~hmac=154aad3cdb7fd71c793d80f3a85f905f4ec3d551e93fadf10ba36286b201b786"
  ),
  new Producto(
    3,
    "camion",
    300,
    "https://img.freepik.com/vector-gratis/camion-reparto-caja-grande_1284-44424.jpg?w=1380&t=st=1665714104~exp=1665714704~hmac=a0717b4f1a05e301cfa488e81b49862f6e50af715786b469f3e42ac27012fd2a"
  ),
];

router.get("/", (req, res) => {
  res.status(200).json({
    arrayProductos,
  });
});

router.get("/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    let producto = Producto.getById(id, arrayProductos);
    res.status(200).json({
      producto,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

router.post("/", (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        error: "No se envió ningun producto para cargar!",
      });
    }

    if (
      !body.titulo ||
      !body.precio ||
      !body.miniatura ||
      typeof body.titulo !== "string" ||
      typeof body.precio !== "number" ||
      typeof body.miniatura !== "string"
    ) {
      return res.status(400).json({
        error: "Datos inválidos!",
      });
    }
    let producto = Producto.saveProduct(body, arrayProductos);
    return res.status(200).json({
      producto,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

router.put("/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }

    const id = parseInt(req.params.id);
    const body = req.body;

    if (
      !body.titulo ||
      !body.precio ||
      !body.miniatura ||
      typeof body.titulo !== "string" ||
      typeof body.precio !== "number" ||
      typeof body.miniatura !== "string"
    ) {
      return res.status(400).json({
        error: "Datos inválidos!",
      });
    }

    Producto.getById(body, arrayProductos);
    return res.status(200).json({
      body,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    Producto.deleteById(arrayProductos, id);
    return res.status(200).json({
      arrayProductos,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
});

module.exports = router;
