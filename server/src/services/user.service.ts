import { injectable, inject } from "tsyringe";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/User";
import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { CreateUserDto } from "../dtos/user.dto";
import { LoginUserDto } from "../dtos/user.dto";

type ReturnUserType = Omit<User, "password">;

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<ReturnUserType> {
    const { password, ...userData } = data;

    if (!userData.email || !password) throw new Error("빈 값이 있습니다.");

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) throw new Error("이미 존재하는 이메일입니다");

    const id = uuid();

    const hashedPassword = bcrypt.hash(password, 12);

    const newUser = await this.userRepository.create({
      id,
      password: hashedPassword.toString(),
      ...userData,
    });

    return this.getUserWithOutPassword(newUser);
  }

  async login(data: LoginUserDto): Promise<string> {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("존재하지 않는 이메일입니다.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("비밀번호가 일치하지 않습니다");

    const token = jwt.sign(
      { id: user.id, email: user.email, nickname: user.nickname },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "30m" }
    );

    return token;
  }

  async findUserById(id: string): Promise<ReturnUserType | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.getUserWithOutPassword(user) : null;
  }

  async findUserByNickname(nickname: string): Promise<ReturnUserType | null> {
    const user = await this.userRepository.findByNickname(nickname);
    return user ? this.getUserWithOutPassword(user) : null;
  }

  getUserWithOutPassword(user: User) {
    const { password, ...withOutPassword } = user;
    return withOutPassword;
  }
}
