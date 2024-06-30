import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPAssword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPAssword });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created success" });
  } catch (error) {
    res.status(500).json({ message: "User existing" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(500).json({ message: "User not found" });

    const validPass = await bcryptjs.compareSync(password, validUser.password);
    if (!validPass)
      return res.status(500).json({ message: "password is not valid" });

    const token = jwt.sign({ id: validUser._id }, "ttt");
    res.cookie("acces_token", token, { httpOnly: true }).json(validUser);
  } catch (error) {
    console.error("Error signIn:", error);
    res.status(500).json({ message: "User created failed" });
  }
};
