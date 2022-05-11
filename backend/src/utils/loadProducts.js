//load products sample into database
import mongoose from "mongoose";
import productsFile from "../../products.json" assert { type: "json" };
import { Product } from "../models/product.model.js";
const MONGO_URI = "mongodb://0.0.0.0:27017/store";

const { products } = productsFile;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        products.forEach(async (product) => {
            const created = await Product.create(product);
            console.log(created);
        });
    })
    .catch(console.dir);
