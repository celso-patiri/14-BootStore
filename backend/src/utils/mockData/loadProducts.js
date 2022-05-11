//load products sample into database
import mongoose from "mongoose";
import products from "./products.js";
import { Product } from "../../models/product.model.js"
const MONGO_URI = "mongodb://0.0.0.0:27017/store";

mongoose
    .connect(MONGO_URI)
    .then(async () => {
        await products.forEach(async (product) => {
            // console.log(product);
            const created = await Product.create(product);
            // console.log(created);
        });

        const dbProducts = await Product.find({});

        console.log("-----------------------------");
        console.log(dbProducts);

    })
    .catch(console.dir);
