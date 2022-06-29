import * as jwt from "jose";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { startDatabase } from "../config/db.js";
import { User } from "../models/User.js";

async function login(req, res) {
    const { email, password } = req.body;
    try {
        let { client, db } = await startDatabase();
        const user = await db.collection("users").findOne({ email: email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            const tokenObj = { userId: user._id, token, timestamp: Date.now() }
            await db.collection("sessions").insertOne(tokenObj);
            res.status(200).send({ token });
        } else {
            res.status(401).send({ msg: "Senha ou e-mail incorreto!" });
        }
        client.close();
    } catch (err) {
        console.log(err);
    }
};

async function signup(req, res) {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    try {
        let { client, db } = await startDatabase();
        const userTaken = await db.collection("users").findOne({ email });
        if (userTaken) {
            res.status(422).send({ msg: "Usuário já foi cadastrado" });
        } else {
            const userObj = { name, email, password: passwordHash }
            const { value, error } = User.validateAsync(userObj);
            if (error) {
                res.status(422).send(error);
            } else {
                await db.collection("users").insertOne(value);
                res.sendStatus(201);
            }
        }
        client.close();
    } catch (err) {
        console.log(err);
    }

};

async function logout(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try {
        let { client, db } = await startDatabase();
        const response = await db.collection("sessions").deleteOne({ token });
        if(response) res.status(200).send("usuário fez logout!");
        client.close();
    } catch (err) {
        console.log(err);
    }
}

export { login, signup, logout };