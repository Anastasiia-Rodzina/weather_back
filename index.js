import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import routerAuth from "./routes.js";
import "dotenv/config.js";

const { DB_KEY, PORT = 5000 } = process.env;

export const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", routerAuth);

mongoose.set("strictQuery", true);

mongoose
  .connect(
    `mongodb+srv://pototzkajan:${DB_KEY}@cluster1.mfusk.mongodb.net/db_weather`
  )
  .then(() => {
    console.log(`Starting server on port ${PORT}`);
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

export default app;
