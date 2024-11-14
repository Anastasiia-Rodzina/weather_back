import HttpError from "../../helpers/HttpError.js";

import User from "../../models/user.js";
import City from "../../models/cities.js";

const addUser = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(400, "User does not exist");
  }

  const city = await City.findById(id);
  if (!city) {
    throw HttpError(404, "City not found");
  }
  if (city.assignees.includes(user._id)) {
    throw HttpError(
      409,
      `User ${user.email} is already an owner of city ${id}`
    );
  }

  await City.findByIdAndUpdate(id, { $push: { assignees: user._id } });

  res.json({
    message: `User ${user.email} has successfully been added as an owner to city ${id}`,
  });
};

export default addUser;
