import Router from "express";
import productRouter from "./product.route.js";
import cartRouter from "./cart.route.js";
import userRouter from "./user.route.js";
import { isLoggedIn } from "../middlewares/user.middleware.js";

const router = Router();

router.use("/producto", isLoggedIn, productRouter);
router.use("/carrito", isLoggedIn, cartRouter);
router.use("/usuario", userRouter);

export default router;
