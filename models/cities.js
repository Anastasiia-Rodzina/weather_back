import mongoose, { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";

const citiesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "set title for cities"],
    },
    assignees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { versionKey: false, timestamps: false }
);

citiesSchema.post("save", handleMongooseError);

const City = model("cities", citiesSchema);

export default City;
