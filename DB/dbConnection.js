import mongoose from "mongoose";
export const conectDB = async () => {
  return await mongoose
    .connect(process.env.Connection_db_Cloud)
    .then((res) => console.log("DB connection success"))
    .catch((error) => console.log("DB connection fail ", error));
};
