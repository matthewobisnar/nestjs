import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SigninUserRequestDto } from 'src/shared/dtos/signin.user.request.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUserDto } from 'src/shared/dtos/authenticated.user.dto';
import { UserEntity } from 'src/infrastructure/entities/user.entity';


@Injectable()
export class PassportService {

    constructor(
      @InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>,
      private readonly jwtService: JwtService
    ) {}


    async validateUser(signinUserDto: SigninUserRequestDto): Promise<AuthenticatedUserDto> {
        
        const user = await this.userEntityRepository.findOne({
            where: { email: signinUserDto.email },
            relations: ['roles']
        });

        if (user && await bcrypt.compare(signinUserDto.password,user.password)) {

          const { id, firstname, lastname, roles } = user;

          return  { 
              id, 
              firstname, 
              lastname, 
              roles: roles.map(role => role.roleName.toUpperCase()) 
            } as AuthenticatedUserDto;
        }

        return null;
    }

    authenticatedLocalUser = async (payload: any) => payload;
    authenticatedUserWithJwt = async (payload: any) => ({
        access_token: this.jwtService.sign(payload),
    });
}
