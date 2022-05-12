import { Cart } from "../models/cart.model.js";
import { Wishlist } from "../models/wishlist.model.js";
import dayjs from "dayjs";
import { Product } from "../models/product.model.js";

// middleware
export const validateCartBody = async (req, res, next) => {
    let { productId, quantity } = req.body;
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
        const cartProductsData = cart.products
        const productIds = cartProductsData.map(item => {
            return item.productId;
        })
        const products = await Product.find().where('_id').in(productIds).exec();

        const sendData = cartProductsData.map(product => {
            const { quantity, productId } = product
            let price, title, thumbnail;

            products.forEach(p => {
                if (p._id.toString() === product.productId.toString()) {
                    price = p.price;
                    thumbnail = p.thumbnail;
                    title = p.title;
                }
            })

            return { quantity, productId, price, title, thumbnail };
        })

        res.status(201).send({ cart: sendData });
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

        if (productIndex < 0 && quantity > 0) {
            products.push(newProduct)
        }
        else {
            if (quantity > 0) { products[productIndex] = newProduct; }
            else { products.splice(productIndex, 1); }
        }
        await Cart.updateOne({ userId }, { $set: { "products": products } })
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
        wishlistProducts.forEach(wsProduct => {
            let notInCart = true;
            cartProducts.forEach(cProdut => {
                if (wsProduct.productId.toString() === cProdut.productId.toString()) { notInCart = false }
            })
            if (notInCart) {
                cartProducts.push({ productId: wsProduct.productId, quantity: 1 })
            }
        })

        await Cart.updateOne({ userId }, { $set: { "products": cartProducts } })
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send({ error: err });
    }
}


export const clearUserCart = async (req, res, next) => {
    const { userId } = res.locals.userInfo;
    try {
        const cart = await Cart.findOne({ userId });
        const products = cart.products;
        res.locals.orderProducts = products;
        await Cart.updateOne({ userId }, { $set: { "products": [] } })
    } catch (err) {
        res.status(500).send({ error: err });
    }
    next();
};