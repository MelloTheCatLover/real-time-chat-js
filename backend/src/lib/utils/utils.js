import jwt from "jsonwebtoken";

export const generateToken = (userId, response) => {
  const jwttoken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  response.cookie("jwttoken", jwttoken, {
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict", // do not allow cross-site scripting
    secure: process.env.NODE_ENV !== "dev", // true for HTTPS only.
  }); // 1 week

  return jwttoken;
};
