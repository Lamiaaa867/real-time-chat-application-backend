import jwt from "jsonwebtoken";

//=========generate token =============
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.secret_Key, {
    expiresIn: "15h",
  });

  res.cookie("jwt", token, {
  //  maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_DEV !== "devlopment",
  });
};
