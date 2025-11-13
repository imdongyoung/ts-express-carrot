import { User } from "../entities/User";

export type CreateUserDto = Partial<User>;
export type LoginUserDto = Pick<User, "email" | "password">;
