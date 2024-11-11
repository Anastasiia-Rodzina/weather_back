import jwt from "jsonwebtoken";
import "dotenv/config.js";

const tokenAuth = function () {
  const payload = { id: this._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10d" });
};

export default tokenAuth;
