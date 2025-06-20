const express = require("express"); //express simplifies handing HTTP requests, routing, middleware, and server setup in node.js application
const mongoose = require("mongoose"); //mongoose provides a structured way to interact with MongosDB, allowing you to define schemas and models, validate data, and perform CRUF operations easily
const cors = require("cors"); // this is cross origin resource sharing its allows your server to accept requests from different origin if frontend is hosted on a different domain than your backend, without it the browers blocks cross origin API calls for security reasons
require("dotenv").config(); // it is used to securely manage sensitive information like database strings, API keys, etc

const app = express();
app.use(
  cors({
    origin: [
      "https://online-feedback-form.vercel.app",
      "http://localhost:5173",
    ],
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
    // Remove port 5000 for Vercel deployment
    app.listen(process.env.PORT || 5000, () => console.log("server started"));
  })
  .catch((err) => console.log(err));
