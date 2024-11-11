import express from "express";
import ctrlWrapper from "./helpers/ctrlWrapper.js";
import {
  login,
  register,
  logout,
  getUsers,
} from "./controllers/authController.js";
import { check } from "express-validator";

const routerAuth = express.Router();

routerAuth.post(
  "/register",
  check("name", "name must be").notEmpty(),
  check("password", "password must be from 5 to 10 symbols").isLength({
    min: 5,
    max: 10,
  }),
  ctrlWrapper(register)
);

routerAuth.post("/login", ctrlWrapper(login));

routerAuth.post("/logout", ctrlWrapper(logout));

routerAuth.get("/users", ctrlWrapper(getUsers));

export default routerAuth;
