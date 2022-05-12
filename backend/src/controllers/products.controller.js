import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";

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

export const getAllCategories = async (_req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).send(categories);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    const limit = req.query.limit || 10;
    const skip = req.query.skip || 0;
    try {
        const products = await Product.find({ category }, {}, { skip, limit });
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const getProductById = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findOne({ _id: productId });
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};
