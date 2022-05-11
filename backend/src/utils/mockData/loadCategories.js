//load categories sample into database
import mongoose from "mongoose";
import categories from "./categories.js";
import { Category } from "../../models/category.model.js"
const MONGO_URI = "mongodb://0.0.0.0:27017/store";

mongoose
    .connect(MONGO_URI)
    .then(async () => {
        await categories.forEach(async (category) => {
            // console.log(product);
            const created = await Category.create(category);
            // console.log(created);
        });
        const dbData = await Category.find({});
        // console.log("-----------------------------");
        // console.log(dbProducts);
    })
    .catch(console.dir);
