import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.DB_URI;

const client = new MongoClient(DB_URI);

export async function startDatabase() {
    try {
        let db;
        const response = await client.connect();
        if(response) {
            db = client.db("mywallet");
            return { db, client };
        } 
    } catch (err) {
        console.log(err);
    };
}