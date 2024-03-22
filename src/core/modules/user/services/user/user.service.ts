import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>) {}

    async getUsers() {
        return await this.userEntityRepository.find({
            relations: ['roles']
        });
    }

    async getUserById(id: number) {
        return  await this.userEntityRepository.findOne({
            where: { id: 1},
            relations: ['roles'],
        });
    }
}
