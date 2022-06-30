import { db } from "../databases/mongo.js";

export default async function checkAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send("Acesso negado!");
    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            res.status(401).send("Faça login para ter acesso!");
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
    }
}