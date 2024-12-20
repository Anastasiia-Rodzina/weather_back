import User from "../../models/user.js";
import { hashPasswordMiddleware } from "../../helpers/hashPassword.js";

const updateUser = async (req, res) => {
  const { _id, email: oldEmail, name: oldName } = req.user;

  if (req.file) {
    const avatarURL = req.file.path;
    await User.findByIdAndUpdate(_id, { avatarURL });
  }

  const { name = oldName, email = oldEmail, password } = req.body;
  const updatedUser = { name };

  if (password) {
    updatedUser.password = await hashPasswordMiddleware(password);
  }

  if (email && email !== oldEmail) {
    updatedUser.email = email;
  }

  const result = await User.findByIdAndUpdate(_id, updatedUser, {
    new: true,
    select: "name email _id",
  });

  if (!result) {
    return next(new BadRequestError("User not found"));
  }

  res.status(200).json(result);
};

export default updateUser;
