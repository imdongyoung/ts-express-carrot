import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../entities/User";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err: any, user: User, info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        code: 401,
        message: info ? info.message : "인증되지 않은 사용자입니다",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};
