import mongoose from "mongoose";
const { model, Schema, Types } = mongoose;

const orderSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    date: { type: Date, required: true },
    products: [
        {
            productId: { type: Types.ObjectId, required: true, ref: "Product" },
            quantity: { type: Number, required: true },
            required: false,
        },
    ],
});

export const Order = model("Order", orderSchema);
