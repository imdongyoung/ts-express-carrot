import { ExtractJwt } from "passport-jwt";
import { Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import { AppDataSource } from "../../config/dataSource";
import { User } from "../../entities/User";

const userRepository = AppDataSource.getRepository(User);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    async (payload, done) => {
      try {
        const user = await userRepository.findOneBy({ email: payload.email });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { message: "존재하지 않는 정보입니다" });
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
