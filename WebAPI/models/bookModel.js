import mongoose from "mongoose";

//define the Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number },
  read: { type: Boolean, default: false },
});

bookSchema.index({ author: 1 });
bookSchema.index({ title: "text" });

//create a Model
const bookModel = mongoose.model("BookModel", bookSchema);

//await BookModel.createIndexes({author: 1, title: "text"});

export default bookModel;
