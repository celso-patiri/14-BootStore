import { jestExpect as expect } from "@jest/expect";
import "dotenv/config";
import mongoose from "mongoose";
import { User } from "../../models/user.model.js";
import {
    validateCredentials,
    validateEmailAvailable,
    validateSignInBody,
    validateSignUpBody,
} from "../auth.middleware.js";

const MONGO_URI = process.env.MONGO_URI;

describe("Session controller tests", () => {
    const req = {
        body: {},
    };

    const res = {
        locals: {},
        statusCode: 0,
        status: function (code) {
            this.status.send = (obj) => obj;
            this.statusCode = code;
            return this.status;
        },
    };

    next = () => true;

    beforeAll(() => {
        mongoose.connect(MONGO_URI).then(async () => {
            await User.create({ name: "testUser", email: "test@test.com", password: "1234" });
        });
    });

    afterAll(async () => {
        const user = await User.findOne({ email: "test@test.com" });
        await user.deleteOne();
        await mongoose.connection.close();
    });

    describe("sign in middleware tests", () => {
        beforeEach(() => {
            req.body = {
                name: "",
                password: "",
            };
        });

        it("should return 422 if email is empty", async () => {
            const response = await validateSignInBody(req, res, next);
            expect(res.statusCode).toBe(422);
            expect(response.error).toMatch(/email is required/i);
        });

        it("should return 422 if password is empty", async () => {
            req.body.email = "test@test.com";
            const response = await validateSignInBody(req, res, next);
            expect(res.statusCode).toBe(422);
            expect(response.error).toMatch(/\"password\" is not allowed to be empty/i);
        });

        it("should return 409 if email is not registered", async () => {
            req.body.email = "wrongtest@test.com";
            const response = await validateCredentials(req, res, next);
            expect(res.statusCode).toBe(409);
            expect(response.error).toMatch(/email not registered/i);
        });

        it("should return 401 if password is wrong", async () => {
            req.body.email = "test@test.com";
            req.body.password = "wrongpassword";
            const response = await validateCredentials(req, res, next);
            expect(res.statusCode).toBe(401);
            expect(response.error).toMatch(/wrong password/i);
        });
    });

    describe("sign up middleware tests", () => {
        beforeEach(() => {
            req.body = {
                name: "",
                email: "",
                password: "",
            };
        });

        it("should return 422 if name is empty", async () => {
            const response = await validateSignUpBody(req, res, next);
            expect(res.statusCode).toBe(422);
            expect(response.error).toMatch(/\"name\" is not allowed to be empty/i);
        });

        it("should return 422 if email is empty", async () => {
            req.body.name = "test";
            const response = await validateSignUpBody(req, res, next);
            expect(res.statusCode).toBe(422);
            expect(response.error).toMatch(/\"email\" is not allowed to be empty/i);
        });

        it("should return 422 if email is not a valid email format", async () => {
            req.body.name = "test";
            req.body.email = "invalidemailformat";
            const response = await validateSignUpBody(req, res, next);
            expect(res.statusCode).toBe(422);
            expect(response.error).toMatch(/not a valid email format/i);
        });

        it("should return 422 if password is empty", async () => {
            req.body.name = "test";
            req.body.email = "teste@teste.com";
            const response = await validateSignUpBody(req, res, next);
            expect(res.statusCode).toBe(422);
            expect(response.error).toMatch(/\"password\" is not allowed to be empty/i);
        });

        it("should return 401 if email is already registered", async () => {
            req.body.email = "test@test.com";
            const response = await validateEmailAvailable(req, res, next);
            expect(res.statusCode).toBe(401);
            expect(response.error).toMatch(/email already registered/i);
        });
    });
});
