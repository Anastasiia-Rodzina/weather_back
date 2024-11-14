import HttpError from "../../helpers/HttpError.js";
import City from "../../models/cities.js";

import User from "../../models/user.js";

const removeUser = async (req, res) => {
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
  if (!city.assignees.includes(user._id)) {
    throw HttpError(400, `User ${user.email} is not an owner of city ${id}`);
  }
  if (city.assignees.length < 2) {
    throw HttpError(
      409,
      `User ${user.email} is the only owner of the city ${id}. It's preferable to delete the city instead.`
    );
  }

  await City.findByIdAndUpdate(id, { $pull: { assignees: user._id } });

  res.json({
    message: `User ${user.email} has successfully been removed from city ${id}`,
  });
};

export default removeUser;
