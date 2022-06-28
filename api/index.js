import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

app.get("/api/login", (req, res) => {
    res.send("olá");
});