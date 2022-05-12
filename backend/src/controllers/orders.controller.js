import { Order } from "../models/order.model.js"
import dayjs from "dayjs";

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

export const postUserOrder = async (req, res) => {

    const { userId, sessionId } = res.locals.userInfo
    const { orderProducts } = res.locals;
    const date = dayjs();

    try {
        Order.create({ userId: userId, products: orderProducts, date: date });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send({ error: err });
    }

};
