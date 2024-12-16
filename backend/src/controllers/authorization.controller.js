import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils/utils.js";

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
    user = await User.findOne({ username });
    if (user) {
      return response.status(400).json({ message: "User already exists" });
    }
    user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({ message: "User already exists" });
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

export const login = (request, response) => {
  console.log("Login Pag");
};

export const logout = (request, response) => {
  console.log("Logout Pag");
};
