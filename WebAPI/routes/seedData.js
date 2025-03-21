import mongoose from "mongoose";
import bookModel from "../models/bookModel.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/bookAPI")
  .then(() => console.log("Connected to MogoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const books = [
  {
    title: "Fairy tales",
    author: "Hans Christian Andersen",
    year: 1836,
    read: true,
  },
  {
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    year: 1315,
    read: true,
  },
  {
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    year: 1884,
    read: false,
  },
  {
    title: "Stories",
    author: "Franz Kafka",
    year: 1924,
    read: true,
  },
];

bookModel
  .insertMany(books)
  .then(() => {
    console.log("Mock data seeded");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Could not seed to DB", err));
