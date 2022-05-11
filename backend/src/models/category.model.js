import mongoose from "mongoose";
const { model, Schema } = mongoose;

const categorySchema = new Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true }
});

export const Category = model("Category", categorySchema);
