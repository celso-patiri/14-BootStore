import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const wishlistSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    products: [
        {
            productId: { type: Types.ObjectId, required: true, ref: "Product" },
            date: { type: Date, required: true },
            required: false,
        },
    ],
    history: [
        {
            productId: { type: Types.ObjectId, required: true, ref: "Product" },
            date: { type: Date, required: true },
            bought: { type: Boolean, required: true },
            required: false,
        },
    ],
});

export const Wishlist = model("Wishlist", wishlistSchema);
