import todoModel from "../models/todoModel.js";

export const postTodo = async (req, res, next) => {
  try {
    const todo = new todoModel({
      text: req.body.text,
    });

    const newTodo = await todo.save();

    res.status(201).json({
      success: true,
      message: "todo was created",
      newTodo,
    });
  } catch (error) {
    next(errorHandler(400, error.message));
    console.log(error);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const todos = await todoModel.find();
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    next(errorHandler(400, error.message));
    console.log(error);
  }
};

export const updateTodo = async (req, res, next) => {};
export const deleteTodo = async (req, res, next) => {};
