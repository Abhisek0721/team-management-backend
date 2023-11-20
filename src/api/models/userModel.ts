import mongoose, { Schema } from "mongoose";
import UserModelInterface from "../interfaces/userModelInterface";

const userSchema:Schema = new Schema<UserModelInterface>({
  first_name: {
    type: String,
    required: [true, "First Name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,6})+$/,
      "Please enter a valid email",
    ],
  },
  gender: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false
  },
  domain: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: false
  }
});


const User = mongoose.model<UserModelInterface>("users", userSchema);

export default User;
