import jwt from "jsonwebtoken";
import { Session } from "../models/session.model.js";

export const createSession = (_req, res) => {
    const userId = res.locals.userId;
    try{
        const newSession = await Session.create({userId})

        const token = jwt.sign({sessionId: newSession._id}, process.env.JWT_SECRET)
        res.status(201).send({token})

    }catch(err){
        res.status(500).send({error: err})
    }
};

//TODO
export const validateSession = () => {};

//TODO
export const deleteSession = () => {};
