import HttpError from "../../helpers/HttpError.js";
import City from "../../models/cities.js";

const deleteCity = async (req, res) => {
  const { id } = req.params;
  const result = await City.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `City ${id} not found`);
  }
  res.status(200).json({
    message: `City ${id} deleted successfully`,
    data: result,
  });
};

export default deleteCity;
