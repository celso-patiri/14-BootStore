import mongoose from "mongoose";
const { model, Schema } = mongoose;

const sessionSchema = new Schema({
    userId: { type: String, required: true },
});

export const Session = model("Session", sessionSchema);
