import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

enum PROVIDER {
  LOCAL = "local",
  KAKAO = "kakao",
}

// 테이블임의 명시하는 typeorm 데코레이터
@Entity()
export class User {
  // 기본키 정의
  @PrimaryColumn()
  id!: string;

  // 테이블 컬럼 정의
  @Column({ unique: true })
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  password!: string;

  @Column()
  location!: string;

  @Column({ type: "enum", enum: PROVIDER, default: "local" })
  provider!: string;

  @Column({ nullable: true })
  snsId!: string;

  @Column({ nullable: true })
  profileImgURL!: string;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;
}
