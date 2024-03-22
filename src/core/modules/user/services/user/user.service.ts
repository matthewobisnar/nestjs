import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { SignupUserRequestDto } from 'src/shared/dtos/signup.user.request.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoleEntity } from 'src/infrastructure/entities/user.role.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>,
        @InjectRepository(UserRoleEntity) private readonly userRoleEntityRepository: Repository<UserRoleEntity>,
        private readonly jwtService: JwtService
    ) {}

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

    private async byecriptEncrypt(password: string) : Promise<string> {
        return await bcrypt.hash(password, await bcrypt.genSalt());
    }

    public async registerUser(user: SignupUserRequestDto) {

        const isUserExists = await this.userEntityRepository.countBy({ email: user.email });

        console.log(isUserExists);

        if (isUserExists > 0) {
            throw new BadRequestException(`${user.email} is already exists.`)
        }

        const userEntity: UserEntity = this.userEntityRepository.create({
            ...user,
            password: await this.byecriptEncrypt(user.password),
            createdAt: new Date(),
            createdBy: '00-00000'
        });
        
        const result: UserEntity = await this.userEntityRepository.save(userEntity);

        if (result != null) {

            const userRoleEntity: UserRoleEntity = this.userRoleEntityRepository.create({
                userId: result.id,
                roleName: 'USER',
                createdAt: new Date(),
                createdBy: result.email
            });

            await this.userRoleEntityRepository.save(userRoleEntity);
            return result;
        }
        
        return null;
    }
}
