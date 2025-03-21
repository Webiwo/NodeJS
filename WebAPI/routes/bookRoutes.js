import express from "express";
import { getBooks } from "../controllers/bookController.js";

const bookRouter = express.Router();

bookRouter.route("/books").get(getBooks);

export default bookRouter;
