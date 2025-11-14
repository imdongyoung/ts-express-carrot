import { NextFunction, Router, Request, Response } from "express";
import passport from "passport";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
