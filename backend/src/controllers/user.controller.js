import sanitizeHtml from "sanitize-html";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await User.create({
            name: sanitizeHtml(name),
            email: sanitizeHtml(email),
            password: bcrypt.hashSync(sanitizeHtml(password), 10),
        });

        res.locals.userInfo = {
            userId: newUser._id,
            name: newUser.name,
            email: newUser.email,
        };

        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const findUser = async (req, res) => {
    try {
        const { userId } = res.locals.userInfo;
        const { name, email } = await User.findOne({ _id: userId });
        if (!email) return res.status(404).send({ error: "User not found" });

        res.status(200).send({ name, email });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const updateUser = async (req, res) => {

    const { userId } = res.locals.userInfo;
    let { name, email, password } = req.body;

    console.log(name, email, password);

    try {
        const newUserData = {
            name: sanitizeHtml(name),
            email: sanitizeHtml(email),
            password: bcrypt.hashSync(sanitizeHtml(password), 10),
        }
        await User.updateOne({ _id: userId }, newUserData);
        const user = await User.findOne({ _id: userId });
        console.log('vou enviar', user.name, user.email);
        const objeto = { name: user.name, email: user.email };
        res.status(200).send(objeto);
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const deleteUser = async (req, res) => {
    try {
        // TODO: delete user
        // Tem que ser feito dessa maneira abaixo pro hook definido no user.model funcionar
        // const user = await User.findOne({...});
        // await user.deleteOne();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};
