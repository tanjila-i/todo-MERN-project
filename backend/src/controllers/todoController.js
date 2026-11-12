import todoModel from "../models/todoModel.js";
import errorHandler from "../utils/errorHandler.js";

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

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return next(errorHandler(404, "Todo not found"));
    }

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      message: "todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    next(errorHandler(400, error.message));
    console.log(error);
  }
};
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await todoModel.findByIdAndDelete({ _id: req.params.id });

    if (!todo) {
      return next(errorHandler(404, "todo not found"));
    }

    res.status(200).json({
      success: true,
      message: "todo was deleted was sucessfully",
    });
  } catch (error) {
    next(errorHandler(400, error.message));
    console.log(error);
  }
};
