import express from "express";
import bookRouter from "./routes/bookRoutes.js";
import mongoose from "mongoose";

const port = process.env.PORT || 5000;
const app = express();

//middleware to parse JSON
app.use(express.json());

//mount the bookRouter
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to books API server");
});

//connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/bookAPI")
  .then(() => console.log("Connected to MogoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.listen(port, () => {
  console.log(`Listening on posrt ${port}...`);
});
