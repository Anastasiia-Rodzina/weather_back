import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import routerAuth from "./routes/routesAuth.js";
import routerCities from "./routes/routesCities.js";
import dotenv from "dotenv";
import fs from "fs";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const { DB_HOST } = process.env;
const port = process.env.PORT || 4000;
export const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", routerAuth);
app.use("/cities", routerCities);

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
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
