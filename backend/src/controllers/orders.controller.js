import { Order } from "../models/order.model.js"
import dayjs from "dayjs";
import { Product } from "../models/product.model.js";

export const getOrdersFromUser = async (req, res) => {
    const { userId } = res.locals.userInfo;
    console.log(userId);
    try {
        const orders = await Order.find({ userId });
        res.status(201).send({ orders: orders });
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
        const productIds = orderProducts.map(item => {
            return item.productId;
        })
        const productsFromDb = await Product.find().where('_id').in(productIds).exec();

        const products = productsFromDb.map(product => {
            const { _id, title, price, thumbnail } = product;
            let quantity = 1;
            orderProducts.forEach(p => {
                if (p.productId.toString() === product._id.toString()) {
                    quantity = p.quantity
                }
            })
            cartAmmount += quantity * price;
            return { productId: _id, title, price, thumbnail, quantity };
        })

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
