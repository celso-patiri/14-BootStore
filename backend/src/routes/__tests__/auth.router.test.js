import mongoose from "mongoose";
import request from "supertest";
import { jestExpect as expect } from "@jest/expect";
import app from "../../app.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";

const MONGO_URI = process.env.MONGO_URI;

describe("auth routes tests", () => {
    beforeAll(() => {
        mongoose.connect(MONGO_URI).then(async () => {
            await User.create({
                name: "testUser",
                email: "test@test.com",
                password: bcrypt.hashSync("1234", 10),
            });
        });
    });

    afterAll(async () => {
        const user1 = await User.findOne({ email: "test@test.com" });
        await user1.deleteOne();
        const user2 = await User.findOne({ email: "test2@test.com" });
        await user2.deleteOne();
        await mongoose.connection.close();
    });

    const mockSignIn = {
        email: "test@test.com",
        password: "1234",
    };

    const mockSignUp = {
        name: "testuser",
        email: "test2@test.com",
        password: "1234",
    };

    test("Sucessfull signin", async () => {
        await request(app)
            .post("/auth/signin")
            .send(mockSignIn)
            .expect(201)
            .then((res) => {
                const response = JSON.parse(res.text);
                expect(response.userId).not.toBeFalsy();
                expect(response.email).not.toBeFalsy();
                expect(response.name).not.toBeFalsy();
                expect(response.token).not.toBeFalsy();
            });
    });

    test("Sucessfull signup", async () => {
        await request(app)
            .post("/auth/signup")
            .send(mockSignUp)
            .expect(201)
            .then((res) => {
                const response = JSON.parse(res.text);
                expect(response.userId).not.toBeFalsy();
                expect(response.email).not.toBeFalsy();
                expect(response.name).not.toBeFalsy();
                expect(response.token).not.toBeFalsy();
            });
    });
});
