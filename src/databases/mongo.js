import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.DB_URI;

const client = new MongoClient(DB_URI);

client.connect();
export let db = client.db("mywallet");
