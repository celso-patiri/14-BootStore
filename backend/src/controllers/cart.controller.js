import { Cart } from "../models/cart.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import dayjs from "dayjs";
import { Product } from "../models/product.model.js";

// middleware
export const validateCartBody = async (req, res, next) => {
    let { productId, quantity } = req.body;
    if (quantity < 0) {
        return res.status(401).send({ error: "Quantity must be 0 or greater" });
    }
    try {
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(401).send({ error: "Product must be valid" });
        }
        next();
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

export const getCartByUserId = async (_req, res) => {
    const { userId } = res.locals.userInfo;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) throw "No cart for this userId";

        const sendData = await Promise.all(
            cart.products.map(async (product) => {
                const { quantity, productId } = product;
                const productData = await Product.findOne({ _id: productId });

                return {
                    productId,
                    quantity,
                    productData,
                };
            })
        );

        res.status(201).send({ cart: sendData });
    } catch (err) {
        console.log(err);
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
            if (product.productId.toString() === productId) {
                productIndex = index;
            }
        });
        let newProduct = { productId, quantity };

        if (productIndex < 0 && quantity > 0) {
            products.push(newProduct);
        } else {
            if (quantity > 0) {
                products[productIndex] = newProduct;
            } else {
                products.splice(productIndex, 1);
            }
        }
        await Cart.updateOne({ userId }, { $set: { products: products } });
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

export const addWishlistToCart = async (req, res) => {
    const { userId } = res.locals.userInfo;
    try {
        const cart = await Cart.findOne({ userId });
        const cartProducts = cart.products;
        const wishlist = await Wishlist.findOne({ userId });
        const wishlistProducts = wishlist.products;
        wishlistProducts.forEach((wsProduct) => {
            let notInCart = true;
            cartProducts.forEach((cProdut) => {
                if (wsProduct.productId.toString() === cProdut.productId.toString()) {
                    notInCart = false;
                }
            });
            if (notInCart) {
                cartProducts.push({ productId: wsProduct.productId, quantity: 1 });
            }
        });

        await Cart.updateOne({ userId }, { $set: { products: cartProducts } });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const clearUserCart = async (req, res, next) => {
    const { userId } = res.locals.userInfo;
    try {
        const cart = await Cart.findOne({ userId });
        const products = cart.products;
        res.locals.orderProducts = products;
        await Cart.updateOne({ userId }, { $set: { products: [] } });
    } catch (err) {
        res.status(500).send({ error: err });
    }
    next();
};
