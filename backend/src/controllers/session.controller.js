import jwt from "jsonwebtoken";
import { Session } from "../models/session.model.js";

export const createSession = async (_req, res) => {
    const userInfo = res.locals.userInfo;
    try {
        const newSession = await Session.create({ userId: userInfo.userId });

        const token = jwt.sign({ sessionId: newSession._id }, process.env.JWT_SECRET);
        res.status(201).send({ ...userInfo, token });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

//TODO
export const validateSession = () => {};

//TODO
export const deleteSession = () => {};
