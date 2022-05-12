import mongoose from "mongoose";
const { model, Schema, Types } = mongoose;

const cartSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, unique: true, ref: "User" },
    products: [
        {
            productId: { type: Types.ObjectId, required: true, ref: "Product" },
            quantity: { type: Number, required: true },
            required: false,
        },
    ],
});

export const Cart = model("Cart", cartSchema);
