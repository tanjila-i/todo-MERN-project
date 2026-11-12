import express from "express";
import {
  deleted,
  login,
  logout,
  register,
} from "../controllers/userController.js";

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.delete("/delete/:id", deleted);

export default authRoute;
