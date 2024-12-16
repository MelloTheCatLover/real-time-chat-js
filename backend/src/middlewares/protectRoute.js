import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (request, response, next) => {
  try {
    const token = request.cookies.jwttoken;

    if (!token) {
      return response
        .status(401)
        .json({ message: "No token, authorization denied" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("--password");

      if (!user) {
        console.log("User not found");
        return response.status(404).json({ message: "User not found" });
      }

      console.log(user);

      request.user = user;

      next();
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    response.status(500).json({ message: "Server error" });
  }
};
