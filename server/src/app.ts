import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/dataSource";
import authRouter from "./routes/auth.routes";
import passport from "passport";

import "./auth/strategy/local.startegy";
import "./auth/strategy/jwt.startegy";
import { verifyToken } from "./middlewares";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(passport.initialize()); // passport 초기화

app.use("/auth", authRouter);
app.get("/product", verifyToken, (req, res) => {
  res.json({ message: "성공" });
});

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
