import { Product } from "../models/product.model.js";

export const getProducts = async (req, res) => {
    const limit = req.query.limit || 10;
    const skip = req.query.skip || 0;
    try {
        const products = await Product.find({}, {}, { skip, limit });
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const getAllCategories = (req, res) => {
    //TODO
};

export const getProductsByCategory = (req, res) => {
    //TODO
};

export const getProductById = (req, res) => {
    //TODO
};
