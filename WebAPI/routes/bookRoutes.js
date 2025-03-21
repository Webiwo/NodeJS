import express from "express";
import bookModel from "../models/bookModel.js";
import Joi from "joi";

const bookRouter = express.Router();

//Joi schema for Query validation
const querySchema = Joi.object({
  title: Joi.string().min(3).max(50).optional().messages({
    "string.base": "Title can only contain letters and numbers.",
    "string.min": "Title must have at least 3 characters.",
    "string.max": "Title must not exceed 50 characters.",
  }),
  author: Joi.string().min(3).max(50).optional().messages({
    "string.base": "Author must be a string.",
    "string.min": "Author must have at least 3 characters.",
    "string.max": "Author must not exceed 50 characters.",
  }),
  year: Joi.number()
    .integer()
    .positive()
    .max(new Date().getFullYear())
    .optional()
    .messages({
      "number.base": "Year must be a valid year in YYYY format",
    }),
  read: Joi.boolean().optional().messages({
    "string.base": "Read must be a boolean.",
  }),
});

bookRouter.route("/books").get(async (req, res) => {
  try {
    const { error, value } = querySchema.validate(req.query, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.details.map((err) => err.message),
      });
    }

    const query = {};
    const { title, author, year, read } = value;

    if (title) query.title = { $regex: title, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };
    if (year) query.year = year;
    if (read) query.read = read;

    const books = await bookModel.find(query); //fetch all books
    res.status(200).json({
      sucess: true,
      data: books,
    });
  } catch (err) {
    console.log("Could not fetch books data", err);
    res.status(500).json({ message: "Could not fetch books data" });
  }
});

export default bookRouter;
