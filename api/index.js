import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://dumindu:dumindu24@mern.8sp1ced.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=mern"
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

// app.get("/", (req, res) => {
//   res.json({
//     message: "API is working",
//   });
// });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
