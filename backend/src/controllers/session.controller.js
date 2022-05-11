import jwt from "jsonwebtoken";
import { Session } from "../models/session.model.js";

export const createSession = async (_req, res) => {
    const { userId, name, email } = res.locals.userInfo;
    try {
        const newSession = await Session.create({ userId });

        const token = jwt.sign({ sessionId: newSession._id, userId }, process.env.JWT_SECRET);
        res.status(201).send({ name, email, token });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

//TODO
export const validateSession = () => {};

//TODO
export const deleteSession = () => {};
