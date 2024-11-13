import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import routerAuth from "./routes/routesAuth.js";
import routerCities from "./routes/routesCities.js";
import "dotenv/config.js";

const { DB_HOST } = process.env;
const port = process.env.PORT || 4000;
export const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", routerAuth);
app.use("/cities", routerCities);

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Starting server on port ${port}`);
    app.listen(port, () => {
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
