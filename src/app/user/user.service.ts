import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Like,LessThan,MoreThan } from 'typeorm';
import { User} from './user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }
}
