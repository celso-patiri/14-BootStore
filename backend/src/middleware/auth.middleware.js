import bcrypt from "bcrypt";
import Joi from "joi";
import { User } from "../models/user.model.js";

const SignInSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        "string.min": "Name must be at least 2 characters long",
        "any.required": "Name is required",
    }),
    password: Joi.string().min(4).required().messages({
        "string.min": "Password must be at least 4 characters long",
        "any.required": "Password is required",
    }),
});

const SignUpSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        "string.min": "Name must be at least 2 characters long",
        "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Not a valid email format",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(4).required().messages({
        "string.min": "Password must be at least 4 characters long",
        "any.required": "Password is required",
    }),
});

export const validateSignInBody = (req, res, next) => {
    const { error } = SignInSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0] });
    next();
};

export const validateSignUpBody = (req, res, next) => {
    const { error } = SignUpSchema.validate(req.body);
    if (error) return res.status(422).send({ error: error.details[0] });
    next();
};

export const validateCredentials = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(409).send({ error: "Email not registered" });
        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).send({ error: "Wrong Password" });

        res.locals.userId = user._id;

        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

export const validateEmailAvailable = async (req, res, next) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send({ error: "Email already registered" });

        next();
    } catch (err) {
        res.status(500).send({ error: err });
    }
};
