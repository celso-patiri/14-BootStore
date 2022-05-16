import { Order } from "../models/order.model.js"
import dayjs from "dayjs";
import { Product } from "../models/product.model.js";
import sgMail from '@sendgrid/mail'
import { User } from "../models/user.model.js";


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

        const user = await User.findOne({ _id: userId });
        const { email, name } = user;

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


        let productsBody = ``;
        products.forEach(p => {
            productsBody += `<li>${p.title}: $${p.price} x ${p.quantity} = $${p.price * p.quantity}</li>`;
        })

        let emailBody = `
        <h1>BootStore</h1>
        <p>Hey, <strong>${name}</strong>!</p>
        <p>Seu pedido feito em ${dayjs(date).format("DD/MM")} já está sendo enviado para ${address}.</p>
        <p>O valor total foi de <strong>$${totalAmmount}</strong>. Veja os produtos</p>
        <ul>${productsBody}<ul>
        `;

        sgMail.setApiKey('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');
        const msg = {
            to: email,
            from: 'estevamfurtado@gmail.com', // Use the email address or domain you verified above
            subject: 'Seu pedido foi enviado!',
            html: emailBody,
        };

        console.log(msg);

        try {
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
            }
        }

        res.sendStatus(200);

    } catch (err) {
        res.status(500).send({ error: err });
    }

};
