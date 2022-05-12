import { Cart } from "../models/cart.model.js";
import dayjs from "dayjs";
import { Product } from "../models/product.model.js";

// middleware
export const validateCartBody = async (req, res, next) => {
    let { productId, quantity } = req.body;
    console.log(quantity);
    if (quantity < 0) { return res.status(401).send({ error: "Quantity must be 0 or greater" }) }
    try {
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(401).send({ error: "Product must be valid" })
        };
        next();
    }
    catch (err) {
        return res.status(500).send({ error: err });
    }
}

export const getCartByUserId = async (req, res) => {
    const { userId } = res.locals.userInfo;
    try {
        const cart = await Cart.findOne({ userId });
        let allProducts = cart.products;
        let products = allProducts.filter(product => product.quantity > 0);
        res.status(201).send({ cart: products });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};


export const updateUserCart = async (req, res) => {
    const { userId } = res.locals.userInfo;
    const { productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        let { products } = cart;

        let productIndex = -1;
        products.forEach((product, index) => {
            if (product.productId.toString() === productId) { productIndex = index }
        })
        let newProduct = { productId, quantity };

        if (productIndex < 0) {
            products.push(newProduct)
        }
        else {
            products[productIndex] = newProduct;
        }
        await Cart.updateOne({ userId }, { $set: { "products": products } })
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

// TODO
export const clearUserCart = async (req, res, next) => {
    //TODO
    //const {userId, sessionId} = res.locals.userInfo
};
