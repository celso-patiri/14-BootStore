import { Order } from "../models/order.model.js"
import dayjs from "dayjs";
import { Product } from "../models/product.model.js";

export const getOrdersFromUser = async (req, res) => {
    const { userId } = res.locals.userInfo;
    console.log(userId);
    try {
        const orders = await Order.find({ userId });
        res.status(201).send(orders);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};


export const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.find({ _id: orderId });

        res.status(200).send(order);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};


export const postUserOrder = async (req, res) => {

    const { userId } = res.locals.userInfo
    const { orderProducts } = res.locals;
    const { address } = req.body;
    const date = dayjs();

    let cartAmmount = 0.0;
    let shippingAmmount = 0.0;
    let totalAmmount = 0.0;

    try {

        const products = await Promise.all(
            orderProducts.map(async (product) => {
                const { quantity, productId } = product;
                const productData = await Product.findOne({ _id: productId });
                cartAmmount += quantity * productData.price;
                return {
                    productId,
                    quantity,
                    price: productData.price,
                    title: productData.title,
                    thumbnail: productData.thumbnail
                };
            })
        );

        totalAmmount = cartAmmount + shippingAmmount;
        Order.create({
            userId, date, address,
            cartAmmount, shippingAmmount, totalAmmount,
            products
        });

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send({ error: err });
    }

};
