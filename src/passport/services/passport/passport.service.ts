import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/db/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SigninUserRequestDto } from 'src/shared/dtos/signin.user.request.dto';


@Injectable()
export class PassportService {

    constructor(@InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>) {}


    async validateUser(signinUserDto: SigninUserRequestDto): Promise<any> {
        
        const user = await this.userEntityRepository.findOne({
            where: { email: signinUserDto.email },
            relations: ['roles', 'roles.role']
        });

        if (user && await bcrypt.compare(signinUserDto.password,user.password)) {
          const { password, ...result } = user;
          return result;
        }

        return null;
      }

}
