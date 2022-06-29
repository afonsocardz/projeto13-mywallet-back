import {Router} from "express";
import {login, signup, logout} from "../controllers/auth.controller.js";
import checkAuth from "../middlewares/checkAuth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", checkAuth, logout);

//router.get("/wallet", getWallet);
//router.post("/wallet/income", postWalletIncome);
//router.post("/wallet/outcome", postWalletOutcome);

export {router};