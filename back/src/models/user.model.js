import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://mybroadband.co.za/news/wp-content/uploads/2017/04/Twitter-profile-picture-595x400.jpg",
    },
    userType: {
      type: String,
      required: true,
      enum: ["propertyOwner", "tenant"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
export { userSchema };
