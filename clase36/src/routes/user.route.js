import passport from "passport";
import { Router } from "express";
import { signUp, login, logOut } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/user.middleware.js";
import { body } from "express-validator";

const router = Router();

const passportOptions = {
  badRequestMessage: "Problema con username / password!",
};

router.post(
  "/signup",
  body("username").not().isEmpty().isEmail().trim().escape(),
  body("password").not().isEmpty().isString().trim().escape(),
  signUp
);

router.post(
  "/login",
  passport.authenticate("login", passportOptions),
  body("username").not().isEmpty().isEmail().trim().escape(),
  body("password").not().isEmpty().isString().trim().escape(),
  login
);

router.get("/logout", isLoggedIn, logOut);

export default router;
