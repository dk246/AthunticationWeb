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

export const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, "ttt");
      res.cookie("acces_token", token, { httpOnly: true }).json(user);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPAssword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        password: hashedPAssword,
        profilePhoto: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "ttt");
      res.cookie("acces_token", token, { httpOnly: true }).json(newUser);
    }
    // res.status(201).json({ message: "User created success" });
  } catch (error) {
    res.json({ message: "something wrong" });
  }
};
