const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://online-feedback-form.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

const Feedback = require("./models/Feedback");

app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    // Do NOT call app.listen on Vercel
  })
  .catch((err) => console.log(err));

module.exports = app;
