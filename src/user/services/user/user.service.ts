import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>) {}

    async getUsers() {
        const users = await this.userEntityRepository.findOne({
            where: { id: 1},
            relations: ['roles', 'roles.role'],
        });

        console.log(users);

        return users;
    }
}
