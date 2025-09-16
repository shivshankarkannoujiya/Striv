import { Router } from "express";
import { signUpUser } from "../controllers/auth.controllers.js";

const router = Router()

router.route("/signup").post(signUpUser)

export default router