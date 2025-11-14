import { IsEmail, IsEnum, IsString } from "class-validator";
import { User } from "../entities/User";

export class RegisterUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  nickname!: string;

  @IsString()
  password!: string;

  @IsString()
  location!: string;

  @IsEnum({
    LOCAL: "local",
    KAKAKO: "kakao",
  })
  provider?: string;

  @IsString()
  snsId?: string;
}

export type LoginUserDto = Pick<User, "email" | "password">;
