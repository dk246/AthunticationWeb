import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPAssword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPAssword });

  try {
    await newUser.save();
  } catch (error) {
    res.status(500).json(error.message);
  }
};
