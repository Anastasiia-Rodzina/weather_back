import express from "express";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

import isAuthorized from "../helpers/isAuthorized.js";
import getAllUserCities from "../controllers/cities/getAllUserCities.js";
import addCity from "../controllers/cities/addCity.js";
import deleteCity from "../controllers/cities/deleteCity.js";
import isValidId from "../helpers/isValidId.js";
import addUser from "../controllers/users/addUser.js";
import removeUser from "../controllers/users/removeUser.js";

const routerCities = express.Router();

routerCities.get("/", isAuthorized, ctrlWrapper(getAllUserCities));

routerCities.post("/", isAuthorized, ctrlWrapper(addCity));
routerCities.patch("/:id/add-user", isAuthorized, ctrlWrapper(addUser));
routerCities.patch("/:id/remove-user", isAuthorized, ctrlWrapper(removeUser));

routerCities.delete("/:id", isAuthorized, isValidId, ctrlWrapper(deleteCity));

export default routerCities;
