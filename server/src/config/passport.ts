// import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
// import { AppDataSource } from "./dataSource";
// import { User } from "../entities/User";

// const opts: StrategyOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Header의 'Authorization: Bearer <Token>'에서 추출
//   secretOrKey: process.env.JWT_SECRET || "secret_key", // 서명 검을을 위한 비밀키
// };

// export const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
//   try {
//     const userRepository = AppDataSource.getRepository(User);
//     // 토큰에 있는 id로 유저 검증
//     const user = await userRepository.findOneBy({ id: payload.id });

//     if (user) {
//       return done(null, user); // 인증 성공 -> req.user에 user 객체 할당
//     } else {
//       return done(null, false); // 인증 실패
//     }
//   } catch (error) {
//     return done(error, false); // 서버 에러
//   }
// });
