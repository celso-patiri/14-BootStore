import mongoose from "mongoose";
const { model, Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    rating: { type: Number, required: true },
});

export const Product = model("Product", productSchema);
