import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "../../config/dataSource";
import { User } from "../../entities/User";

const userRepository = AppDataSource.getRepository(User);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const ExistingUser = await userRepository.findOneBy({ email });
        if (ExistingUser) {
          if (await bcrypt.compare(password, ExistingUser.password)) {
            done(null, ExistingUser);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다" });
          }
        } else {
          done(null, false, { message: "존재하지 않는 정보입니다" });
        }
      } catch (error: any) {
        console.error(error);
        done(error);
      }
    }
  )
);
