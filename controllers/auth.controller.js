import { userModel } from "../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/generateToken.js";


//////////////////////////signup api//////////////////////
export const signUp = async (req, res, next) => {
  const { username, gender, password } = req.body;

  const isUserExist = await userModel.findOne({ username });
  if (isUserExist) {
    return res.status(409).json({ error: "username already exists" });
  }
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  const hashedPass = bcrypt.hashSync(password, +process.env.saltRounds);
  const userInstance = new userModel({
    username: username,
    gender,
    password: hashedPass,
 
    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
  });
  if (userInstance) {
    await generateToken(userInstance._id, res);

    await userInstance.save();
    return res.status(201).json({
      _id: userInstance._id,

      username: userInstance.username,
      profilePicture: userInstance.profilePicture,
    });
  } else {
    return res.status(400).json({ error: "invalid user data" });
  }
};
//==============login
export const logIn = async (req, res, next) => {
  const { username, password } = req.body;
  const isUserExist = await userModel.findOne({ username });
  if (!isUserExist || !isUserExist) {
    return res.status(409).json({ error: "username not found, please sign up" });
  }
  const isMatch = bcrypt.compareSync(password, isUserExist.password);
  if (!isMatch) {
    return res.status(409).json({ error: "Wrong password" });
  }
  await generateToken(isUserExist._id, res);
  return res.status(200).json({
    _id: isUserExist._id,
   
    username: isUserExist.username,
    profilePicture: isUserExist.profilePicture,
  });
};
//========log out
export const logOut = async (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 0 });
  return res.status(200).json({
    message: "Logged out succesful",
  });
};
