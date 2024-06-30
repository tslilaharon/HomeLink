import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js"; // Import User model
import { errorHandler } from "../utils/error.js";

dotenv.config();

const hashPassword = (password) => {
  return bcryptjs.hashSync(password, 10);
};

// Common signup function
export const signupUser = async (req, res, next) => {
  const { username, email, password, fullName, userType } = req.body;
  const hashedPassword = hashPassword(password);

  // Create user in the general schema
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    fullName,
    userType,
  });

  try {
    console.log("Creating new user:", newUser); // Logging the new user
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during user creation:", error); // Logging the error
    next(error);
  }
};

// Signin function
export const signin = async (req, res, next) => {
  const { email, password, userType } = req.body;

  try {
    const validUser = await User.findOne({ email, userType });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      // שימוש במפתח הסודי מתוך משתני הסביבה
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error("Error during signin:", error); // Logging the error
    next(error);
  }
};
// Update user function
export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const {
    username,
    email,
    familySize,
    preferredArea,
    rooms,
    children,
    adults,
    babies,
    pet,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        familySize,
        preferredArea,
        rooms,
        children,
        adults,
        babies,
        pet,
      },
      { new: true }
    );

    if (!updatedUser) return next(errorHandler(404, "User not found!"));

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error during user update:", error); // Logging the error
    next(error);
  }
};

// Google auth function
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { password: pass, ...rest } = user._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = `${Math.random()
        .toString(36)
        .slice(-8)}${Math.random().toString(36).slice(-8)}`;
      const hashedPassword = hashPassword(generatedPassword);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
        userType: req.body.userType,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { password: pass, ...rest } = newUser._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.error("Error during Google authentication:", error); // Logging the error
    next(error);
  }
};

// Get user function
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found!"));
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during get user:", error); // Logging the error
    next(error);
  }
};

// Signout function
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json(({message:"User has been logged out!"}));
  } catch (error) {
    console.error("Error during sign out:", error); // Logging the error
    next(error);
  }
};
