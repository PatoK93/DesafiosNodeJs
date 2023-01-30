import { Router } from "express";
const router = Router();
import {
  getProductsInCart,
  createCart,
  addProductsToCart,
  deleteCartById,
  deleteProductInCartById,
} from "../controllers/cart.controller.js";
import { body } from "express-validator";
import { isLoggedIn } from "../middlewares/user.middleware.js";

router.get("/:id/productos", isLoggedIn, getProductsInCart);
router.post("/", isLoggedIn, createCart);
router.post(
  "/:id/productos",
  isLoggedIn,
  body("id").not().isEmpty().isInt({ min: 1 }),
  addProductsToCart
);
router.delete("/:id", isLoggedIn, deleteCartById);
router.delete("/:id/productos/:id_prod", isLoggedIn, deleteProductInCartById);

export default router;
