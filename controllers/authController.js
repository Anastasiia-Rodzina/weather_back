import { validationResult } from "express-validator";
import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Something is wrong");
  }

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw HttpError(401, "Something is wrong");
  }

  const accessToken = user.tokenAuth(user._id);
  if (user.accessToken !== accessToken) {
    await User.findOneAndUpdate({ email }, { accessToken });
  }

  res.json({
    accessToken,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw HttpError(409, "Email is already in use");
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json("registration has a mistake");
  }
  const newUser = await User.create({ name, email, password });
  const accessToken = newUser.tokenAuth(newUser._id);
  newUser.accessToken = accessToken;
  await newUser.save();

  res.status(201).json({
    accessToken,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export const logout = async (req, res, next) => {
  const { user } = req;
  await User.findOneAndUpdate({ _id: user._id }, { accessToken: "" });
  res.status(204).json();
};

export const currentUser = (req, res, next) => {
  const { _id, name, email } = req.user;
  res.json({ _id, name, email });
};
