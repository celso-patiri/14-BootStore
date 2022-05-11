import mongoose from "mongoose";
const { model, Schema, Types } = mongoose;

const orderSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    date: { type: Date, requried: true },
    products: [
        {
            productId: { type: Types.ObjectId, required: true, ref: "Product" },
            required: true,
        },
    ],
});

export const Order = model("Order", orderSchema);
