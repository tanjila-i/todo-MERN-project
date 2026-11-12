import express from "express";
import { getTodos, postTodo } from "../controllers/todoController.js";

const todoRoute = express.Router();

todoRoute.post("/post", postTodo);
todoRoute.get("/get", getTodos);

export default todoRoute;
