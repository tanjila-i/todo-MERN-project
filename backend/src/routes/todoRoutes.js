import express from "express";
import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
} from "../controllers/todoController.js";

const todoRoute = express.Router();

todoRoute.post("/post", postTodo);
todoRoute.get("/get", getTodos);
todoRoute.patch("/update/:id", updateTodo);
todoRoute.delete("/delete/:id", deleteTodo);

export default todoRoute;
