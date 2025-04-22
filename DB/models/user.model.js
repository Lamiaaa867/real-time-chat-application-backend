import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      unique: true,
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
  },
  {
    timestamps: true,
  }
);
export const userModel = mongoose.model("User", userSchema);
