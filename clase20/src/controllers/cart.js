import { CartsModel } from "../models/cart.js";
import { ProductsModel } from "../models/products.js";
import { validationResult } from "express-validator";
import { formatTimeStamp } from "../utils/format.js";

export const getProductsInCart = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);

    const cart = await CartsModel.findById(id);

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    } else {
      return res.status(200).json({
        data: cart,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const createCart = async (req, res) => {
  try {
    let lastId = findLastId();
    lastId + 1;
    let timestamp = formatTimeStamp();
    let products = [];

    await CartsModel.create({
      lastId,
      timestamp,
      products,
    });

    return res.status(201).json({
      mensaje: `carrito ${lastId} creado con exito`,
    });
  } catch (error) {
    return res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const addProductsToCart = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id de carrito válido!",
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.body.id);

    let cart = await CartsModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    let product = await ProductsModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      const productAddedToCart = await CartsModel.findByIdAndUpdate(
        cart._id,
        { product }, //yo creo que esto me pisa el array y me deja, o un solo objeto, o un array con este objeto
        { new: true }
      );

      return res.status(201).json({
        mensaje: "producto agregado al carrito con exito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteCartById = async (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "Tiene que enviar un id válido!",
      });
    }
    const id = parseInt(req.params.id);
    let cart = await CartsModel.findById(id);

    if (!cart) {
      return res.status(404).json({
        mensaje: "arrito no encontrado!",
      });
    } else {
      await CartsModel.findByIdAndDelete(id);
      return res.status(200).json({
        mensaje: "carrito eliminado con exito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const deleteProductInCartById = async (req, res) => {
  try {
    if (isNaN(req.params.id) || isNaN(req.params.id_prod)) {
      return res.status(400).json({
        error: "Tiene que enviar parámetros válidos!",
      });
    }
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.id_prod);

    let cart = await CartsModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado!",
      });
    }

    let product = await CartsModel.find({
      products: {
        id: cartId,
      },
    });

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      const productAddedToCart = await CartsModel.findByIdAndDelete(cart._id, {
        product,
      });

      return res.status(201).json({
        mensaje: "producto eliminado del carrito con exito",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

//metodo repetido (mejorar)

const findLastId = async () => {
  let lastDocument = await CartsModel.sort({ id: -1 }).limit(1);
  let lastId = lastDocument.id;
  return lastId;
};

export default router;
