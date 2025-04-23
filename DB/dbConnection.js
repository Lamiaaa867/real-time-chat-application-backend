import mongoose from "mongoose";
export const conectDB = async () => {
  return await mongoose
    .connect("mongodb://127.0.0.1:27017/real-time-chat-application-backend")
    .then((res) => console.log("DB connection success"))
    .catch((error) => console.log("DB connection fail ", error));
};
