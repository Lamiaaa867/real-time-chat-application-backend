import { userModel } from "../DB/models/user.model.js";

export const getUsers = async (req, res, next) => {
  const userId = req.user._id;
  const allUsers = await userModel
    .find({ _id: { $ne: userId } })
    .select("-password");
  return res.status(200).json(allUsers);
};
