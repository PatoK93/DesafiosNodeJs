import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user.model.js";

const strategyOptions = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

export let actualUser = {};

const signup = async (req, username, password, done) => {
  console.log("SIGNUP!");
  try {
    const query = { username: username };
    const user = await UserModel.findOne(query);

    if (user) {
      return done(null, false, { message: "El usuario ya existe!" });
    }

    let name = req.body.name;
    let adress = req.body.adress;
    let age = req.body.age;
    let phone = req.body.phone;
    let picture = req.body.picture;
    let admin = req.body.admin;

    const newUser = new UserModel({
      username,
      password,
      name,
      adress,
      age,
      phone,
      picture,
      admin,
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    console.log(error);
    return done(null, false, { message: "Error inesperado!" });
  }
};

const login = async (req, username, password, done) => {
  console.log("LOGIN!");
  try {
    const query = { username: username };
    const user = await UserModel.findOne(query);
    actualUser = user;
    if (!user) {
      return done(null, false, { message: "Usuario no encontrado!" });
    } else {
      const match = await user.matchPassword(password);
      if (match) {
        console.log("USUARIO ENCONTRADO!");
        return done(null, user);
      } else return done(null, false);
    }
  } catch (error) {
    console.log(error);
    return done(null, false, { message: "Error inesperado!" });
  }
};

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
  console.log("ejecuta serialize");
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  console.log("ejecuta deserialize");
  const user = await UserModel.findById(userId);
  return done(null, user);
});
