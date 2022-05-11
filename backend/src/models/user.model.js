import mongoose from "mongoose";
const { Schema, model } = mongoose;

import { Wishlist } from "./wishlist.model.js";
import { Cart } from "./cart.model.js";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create Cart and Wishlist assiociated to userId on User creation
userSchema.post("save", (user, next) => {
    Cart.create({ userId: user._id, products: [] });
    Wishlist.create({ userId: user._id, products: [], history: [] });
    next();
});

// Delete associated Cart and Wishlist on User deletion
userSchema.pre("deleteOne", { document: true }, function cleanup(next) {
    Cart.deleteOne({ userId: this._id }, (err) => err && next(err));
    Wishlist.deleteOne({ userId: this._id }, (err) => err && next(err));
    next();
});

export const User = model("User", userSchema);
