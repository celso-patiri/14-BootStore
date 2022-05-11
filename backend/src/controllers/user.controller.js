import sanitizeHtml from "sanitize-html";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await User.create({
            name: sanitizeHtml(name),
            email: sanitizeHtml(email),
            password: bcrypt.hashSync(sanitizeHtml(password)),
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

export const updateUser = (req, res) => {
    try {
        // TODO: update User
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
