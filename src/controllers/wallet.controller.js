import { db } from "../databases/mongo.js";
import { Wallet } from "../models/Wallet.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

async function getWallet(req, res) {
    const { user } = req.headers;
    try {
        const { _id } = await db.collection("users").findOne({ email: user });
        const transactions = await db.collection("wallets").find({ userId: new ObjectId(_id) }).toArray();
        transactions && res.status(200).send(transactions);
    } catch (err) {
        console.log(err);
        res.status(500).send("getWallet: \n" + err);
    }
}

async function postWallet(req, res) {
    const transaction = req.body;
    const { user } = req.headers;
    const date = dayjs().format("DD/MM/YYYY");
    const time = dayjs().format("HH:mm:ss");
    try {
        const { _id } = await db.collection("users").findOne({ email: user });
        const { value, error } = Wallet.validate({ ...transaction, userId: _id, date, time });
        console.log(value);
        if (error) {
            res.status(422).send(error.details);
        } else {
            const response = await db.collection("wallets").insertOne(value);
            response && res.status(201).send({ msg: "Registrado com sucesso!" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("postWallet: \n" + err);
    }
}

export { postWallet, getWallet };