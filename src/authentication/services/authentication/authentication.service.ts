import { BadRequestException, ForbiddenException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SigninUserRequestDto } from 'src/shared/dtos/signin.user.request.dto';
import { SignupUserRequestDto } from 'src/shared/dtos/signup.user.request.dto';
import { UserEntity } from 'src/shared/db/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoleEntity } from 'src/shared/db/entities/user.role.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {

    constructor(
        @InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>,
        @InjectRepository(UserRoleEntity) private readonly userRoleEntityRepository: Repository<UserRoleEntity>,
        private readonly jwtService: JwtService
    ) {}

    public async registerUser(user: SignupUserRequestDto) {

        const isUserExists = await this.userEntityRepository.countBy({ email: user.email });

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

        if (!result) {

            const userRoleEntity: UserRoleEntity = this.userRoleEntityRepository.create({
                userId: result.id,
                roleId: 1,
                createdAt: new Date(),
                createdBy: result.email
            });

            await this.userRoleEntityRepository.save(userRoleEntity);
            return result;
        }
        
        return null;
    }

    private async byecriptEncrypt(password: string) : Promise<string> {
        return await bcrypt.hash(password, await bcrypt.genSalt());
    }

    public async authenticateUser(user: SigninUserRequestDto) {

        const employee = await this.userEntityRepository.findOne({
            where: {email: user.email} ,
            relations: ['roles', 'roles.role'],
         });

         if (!employee) throw new UnauthorizedException('username and/or password is incorred.');

         const isMatch = await bcrypt.compare(user.password, employee.password);

         if (!isMatch) throw new UnauthorizedException('username and/or password is incorred.');
    
         const payload = { 
            sub: employee.id, 
            firstname: employee.firstname, 
            lastname: employee.lastname,
            roles: employee.roles.map(item => item.role.roleName.toUpperCase())
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
