import { Schema, model } from "mongoose";
import { hashPassword } from "../helpers/hashPassword.js";
import comparePassword from "../helpers/comparePassword.js";
import tokenAuth from "../helpers/tokenAuth.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "User",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    accessToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

userSchema.methods.comparePassword = comparePassword;

userSchema.methods.tokenAuth = tokenAuth;

userSchema.pre("save", hashPassword);

const User = model("user", userSchema);

export default User;
