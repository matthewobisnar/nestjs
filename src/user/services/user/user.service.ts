import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>) {}

    async getUsers() {
        return await this.userEntityRepository.find({
            relations: ['roles', 'roles.role'],
        });
    }
}
