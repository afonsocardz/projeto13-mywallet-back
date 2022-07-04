import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/users.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use("/users", router);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
})
