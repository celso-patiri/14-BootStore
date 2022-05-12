import { Wishlist } from "../models/wishlist.model.js";
import dayjs from "dayjs";
import { Product } from "../models/product.model.js";


// middleware
export const validateWishlistBody = async (req, res, next) => {
    const { productId, action } = req.body;
    const actionOptions = ['add', 'delete', 'order'];
    if (actionOptions.indexOf(action) < 0) return res.status(401).send({ error: "'action' can only be ['add', 'delete', 'order']" });

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

export const getWishlistByUserId = async (req, res) => {
    const { userId } = res.locals.userInfo;
    try {
        const wishlist = await Wishlist.findOne({ userId });
        res.status(201).send({ wishlist: wishlist.products });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const updateUserWishlist = async (req, res) => {
    const { userId } = res.locals.userInfo;
    const { productId, action } = req.body;
    const date = dayjs();

    try {
        const wishlist = await Wishlist.findOne({ userId });
        let { products, history } = wishlist;

        let productIndex = -1;
        products.forEach((product, index) => {
            if (product.productId.toString() === productId) { productIndex = index }
        })

        let newProduct = { productId, date };
        let newHistory = { productId, date, action };

        if (action === "add") {
            if (productIndex < 0) {
                products.push(newProduct)
                history.push(newHistory)
            }
            else { return res.status(500).send({ error: `Product is already in wishlist` }); }
        }
        else if (productIndex >= 0) {
            products.splice(productIndex, 1);
            history.push(newHistory)
        }
        else {
            return res.status(500).send({ error: `Product was not found in wishlist` });
        }

        await Wishlist.updateOne({ userId }, { $set: { "products": products, "history": history } })
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const clearUserWishlist = async (req, res, next) => {
    const { userId } = res.locals.userInfo;
    const { orderProducts } = res.locals;
    const date = dayjs();
    try {
        const wishlist = await Wishlist.findOne({ userId });
        let { products, history } = wishlist;
        orderProducts.forEach(orderProduct => {
            let removeAtIndex = -1;
            products.forEach((wlProduct, index) => {
                if (orderProduct.productId.toString() === wlProduct.productId.toString()) {
                    history.push({
                        productId: orderProduct.productId,
                        action: 'order',
                        date
                    })
                    removeAtIndex = index;
                }
            })
            if (removeAtIndex > -1) { products.splice(removeAtIndex, 1) };
        })
        await Wishlist.updateOne({ userId }, { $set: { "products": products, "history": history } })
    }
    catch (err) {
        return res.status(500).send({ error: err });
    }

    next();
};