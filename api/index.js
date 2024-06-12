import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
mongoose
  .connect(
    "mongodb+srv://dumindu:dumindu24@mern.8sp1ced.mongodb.net/?retryWrites=true&w=majority&appName=mern"
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
