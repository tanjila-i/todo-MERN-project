import userModel from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (
      !name ||
      name === "" ||
      !email ||
      email === "" ||
      !password ||
      password === ""
    ) {
      return next(errorHandler(404, "All fileds are required"));
    }

    if (password.length < 8) {
      return next(errorHandler(404, "Password must be 8 characters"));
    }

    const userExists = await userModel.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return next(
        errorHandler(409, "an account with this email already exists"),
      );
    }

    const user = await userModel.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "user was created",
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(errorHandler(404, error.message));
    console.log(error.message);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || email === "" || !password || password === "") {
      return next(errorHandler(400, "All fileds are required"));
    }

    const user = await userModel
      .findOne({ email: email.toLowerCase() })
      .select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return next(errorHandler(409, "Invalid email or password"));
    }
    res.status(200).json({
      success: true,
      message: "user was logging",
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(errorHandler(404, error.message));
    console.log(error.message);
  }
};
export const logout = async (req, res, next) => {};
export const deleted = async (req, res, next) => {};
