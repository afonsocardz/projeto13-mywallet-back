import express, { json } from "express";
import cors from "cors";

export const app = express();
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.get("/api/login", (req, res) => {
    res.send("login");
});

app.listen(5000, () => {
    console.log("Running on port 5000.");
});

