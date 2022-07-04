import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URI);

client.connect();
export let db = client.db("MyWalletCluster");
