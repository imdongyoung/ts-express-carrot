import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/dataSource";
import userRoutes from "./routes/user.routes";
import passport from "passport";
import { jwtStrategy } from "./config/passport";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(passport.initialize()); // passport 초기화
passport.use("jwt", jwtStrategy); // 전략 등록(이름 주의)

app.use("/user", userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("DB 연결 성공");
    app.listen(PORT, () => {
      console.log(`${PORT} listening...`);
    });
  })
  .catch((error) => {
    console.log("DB 연결 실패");
    console.error(error);
  });

export default app;
