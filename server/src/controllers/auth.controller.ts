import { AuthService } from "./../services/auth.service";
import { container } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

export class AuthController {
  private authService = container.resolve(AuthService);

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      passport.authenticate("local", async (authError: any, user: any, info: any) => {
        if (authError || !user) {
          console.error(authError);
          return res.status(400).json({ message: "존재하지 않는 정보입니다" });
        }

        const accessToken = await this.authService.login(req.body);
        res.status(200).json(accessToken);
      })(req, res, next);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };
}
