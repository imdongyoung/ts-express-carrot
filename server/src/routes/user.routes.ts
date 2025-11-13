import { Router } from "express";
import { UserController } from "./../controllers/user.controller";
import passport from "passport";

const router = Router();

router.post("/", UserController.register);
router.get(
  "/nickname/:nickname",
  passport.authenticate("jwt", { session: false }), // 세선 끄기(JWT는 stateless)
  UserController.getUserByNickname
);
router.post("/login", UserController.login);

export default router;
