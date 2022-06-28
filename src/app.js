import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/users.routes.js";

dotenv.config();
const PORT = process.env.SERVER_PORT || 5000;
const app = express();
app.use(cors());
app.use(json());

app.use("/users", router);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})
