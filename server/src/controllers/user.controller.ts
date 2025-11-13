import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserService } from "../services/user.service";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      const id = req.params.id;
      const user = await userService.findUserById(id);
      res.status(200).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserByNickname(req: Request, res: Response) {
    try {
      const userService = container.resolve(UserService);
      const nickname = req.params.nickname;
      const user = await userService.findUserByNickname(nickname);
      res.status(200).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      if (!req.body) res.status(400).json({ msg: "값이 잘못되었습니다" });

      const { email, password } = req.body;
      const userService = container.resolve(UserService);
      const token = await userService.login({ email, password });
      res.status(200).json({ token });
    } catch (error: any) {
      console.error(error);
      res.status(401).json({ message: error.message });
    }
  }
}
