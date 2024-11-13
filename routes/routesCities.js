import express from "express";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

import isAuthorized from "../helpers/isAuthorized.js";
import getAllUserCities from "../controllers/cities/getAllUserCities.js";
import addCity from "../controllers/cities/addCity.js";
import deleteCity from "../controllers/cities/deleteCity.js";

const routerCities = express.Router();

routerCities.get("/", isAuthorized, ctrlWrapper(getAllUserCities));

routerCities.post("/", isAuthorized, ctrlWrapper(addCity));

routerCities.delete("/:id", ctrlWrapper(deleteCity));

export default routerCities;
