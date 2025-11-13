import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../config/dataSource";
import { CreateUserDto } from "../dtos/user.dto";

@injectable()
export class UserRepository {
  private repo: Repository<User>; // TypeORM 리포지토리 인스턴스를 담을 변수

  constructor() {
    // AppDateSource에서 User 엔티티에 대한 리포지토리를 가져옴
    this.repo = AppDataSource.getRepository(User);
  }

  async create(userData: CreateUserDto): Promise<User> {
    // 엔티티 객체 생성(DB에 저장할 데이터를 담은 틀을 생성)
    // 아직 DB에 저장되지않음(Promise 아님)
    const newUser = this.repo.create(userData);

    // 만든 틀을 실제 DB에 저장(Promise)
    return await this.repo.save(newUser);
  }

  async findById(id: string): Promise<User | null> {
    return await this.repo.findOneBy({ id });
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return await this.repo.findOneBy({ nickname });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOneBy({ email });
  }
}
