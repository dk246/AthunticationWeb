import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPAssword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPAssword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created success" });
  } catch (error) {
    next(error);
  }
};
