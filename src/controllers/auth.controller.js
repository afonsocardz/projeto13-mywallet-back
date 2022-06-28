import * as jwt from "jose";
import { startDatabase } from "../config/db.js";

async function login(req, res) {
    let { client, db } = await startDatabase();
    const {email, password} = req.body;
    try {
        const user = await db.collection("users").findOne({email: email});
        if (user.password === password){
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    } catch (err){
        console.log(err);
    }
    client.close();
};

async function signup(req, res) {
    let { client, db } = await startDatabase();
    const user = req.body;
    try {
        const userTaken = await db.collection("users").findOne({ email: user.email });
        if (userTaken) {
            res.status(422).send({ msg: "Usuário já foi cadastrado" });
        } else {
            await db.collection("users").insertOne(user);
            res.sendStatus(201);
        }
    } catch (err) {
        console.log(err);
    }
    client.close();
};

function logout(req, res) {

}

export { login, signup, logout };