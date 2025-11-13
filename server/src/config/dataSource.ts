import { DataSource } from "typeorm";
import path from "path";

const env = process.env.NODE_ENV || "development";
const config = require("./config.json")[env];

export const AppDataSource = new DataSource({
  type: config.dialect,
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  synchronize: false, // true면 서버 실행 시 테이블을 자동 생성/수정(개발용)
  logging: true, // SQL 쿼리 로그 출력
  entities: [path.join(__dirname, "..", "entities", "*.ts")],
});
