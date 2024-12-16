import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils/utils.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import cloudinary from "../lib/utils/cloudinary.config.js";

export const signup = async (request, response) => {
  const { name, username, email, phone, password } = request.body;
  try {
    if (!name || !email || !phone || !password || !username) {
      return response.status(400).json({ message: "Missing required fields" });
    }
    if (password.length < 6) {
      return response
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    console.log("Password: " + password);
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return response
        .status(400)
        .json({ message: "User with this username or email already exists" });
    }
    console.log("User: " + user);
    const salt = await bcrypt.genSalt(10);
    console.log("Salt: " + salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password: " + hashedPassword);
    const newUser = new User({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, response);
      console.log("New User: " + newUser);
      await newUser.save();
      console.log("User saved successfully");
      response.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        message: "User created successfully",
      });
    } else {
      response
        .status(400)
        .json({ message: "Failed to create user. Invalid user data" });
    }
  } catch (error) {
    response.status(500).json({ message: "Server error" });
    console.log("Error in signup controller: " + error.message);
  }
};

export const login = async (request, response) => {
  try {
    const { username, email, password } = request.body;
    if ((!username && !email) || !password) {
      return response.status(400).json({ message: "Missing required fields" });
    }
    let user;
    if (username && email) {
      user = await User.findOne({
        $and: [{ username }, { email }],
      });
    } else if (!user) {
      user = await User.findOne({
        $or: [{ username }, { email }],
      });
    }
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, response);
    response.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      message: "Logged in successfully",
    });
  } catch (error) {

    console.log("Error in login controller: " + error.message);

    response.status(500).json({ message: "Server error" });
  }
};


export const logout = async (request, response) => {
  try {
    response.cookie("jwt", "", { maxAge: 0 });
    response.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: " + error.message);
    response.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (request, response) => {
  try {
    const { avatar } = request.body();
    const userId = request.user._id;

    if (!avatar) {
      return response.status(400).json({ message: "Missing profile picture" });
    }

    const uploadResponse = await cloudinary.uploader.upload(avatar);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatar: uploadResponse.secure_url,
      },
      { new: true }
    );

    if (!updatedUser) {
      return response.status(404).json({ message: "User not found" });
    }

    response.status(200).json({ message: "User updated succesfully" });
  } catch (error) {
    console.log("Error in update profile controller: " + error.message);
    response.status(500).json({ message: "Server error" });
  }
};

export const checkout = (request, response) => {
  try {
    response.status(200).json(request.user);
  } catch (error) {
    console.log("Error in checkout controller: " + error.message);
    response.status(500).json({ message: "Server error" });
  }
};
