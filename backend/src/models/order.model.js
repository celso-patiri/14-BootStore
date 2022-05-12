import mongoose from "mongoose";
const { model, Schema, Types } = mongoose;

const orderSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    date: { type: Date, required: true },
    address: { type: String, required: false },

    cartAmmount: { type: Number, required: false },
    shippingAmmount: { type: Number, required: false },
    totalAmmount: { type: Number, required: false },

    products: [
        {
            productId: { type: Types.ObjectId, required: true, ref: "Product" },
            title: { type: String, required: true },
            thumbnail: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            required: false,
        },
    ],
});

export const Order = model("Order", orderSchema);
