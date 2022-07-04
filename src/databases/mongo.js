import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();


const client = new MongoClient(process.env.DB_URI);

client.connect();
export let db = client.db("mywalletcluster");
