import { injectable } from "tsyringe";
import { AppDataSource } from "../config/dataSource";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import { RegisterUserDto } from "../dtos/user.dto";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

type ReturnValidateUser = Omit<User, "password">;

@injectable()
export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(userData: RegisterUserDto): Promise<User> {
    const { password, ...data } = userData;
    const existingUser = await this.userRepository.findOneBy({ email: userData.email });
    if (existingUser) throw new Error("이미 존재하는 이메일입니다");

    const id = uuid();

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await this.userRepository.save({
      ...userData,
      id,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(user: ReturnValidateUser) {
    const payload = {
      email: user.email,
      nickname: user.nickname,
      location: user.location,
    };

    return {
      access_token: jwt.sign(payload, "secret", { expiresIn: "30m" }),
    };
  }

  async validateUser(email: string, password: string): Promise<ReturnValidateUser | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
