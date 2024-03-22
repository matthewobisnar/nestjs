import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory, JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthenticatedUserDto } from 'src/shared/dtos/authenticated.user.dto';
import e from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshConfig } from 'src/shared/configs/jwts/jwt.refresh.config';
import { JwtAccessConfig } from 'src/shared/configs/jwts/jwt.access.config';
import { TokenResponseDto } from 'src/shared/dtos/token.response.dto';

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectRepository(UserEntity) private readonly userEntityRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private jwtRefreshConfig: JwtRefreshConfig,
    private jwtAccessConfig: JwtAccessConfig
  ) {}

  async authenticate(username: string, passport: string) {

    const user = await this.userEntityRepository.findOne({
      where: { email: username },
      relations: ['roles']
  });

  if (user && await bcrypt.compare(passport, user.password)) {

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

  async signIn(payload: any) {

    const[accessToken, refreshToken] = await Promise.all([
      this.generateTokens(
        payload, 
        'access',
        this.jwtAccessConfig.createJwtOptions()
      ),
      this.generateTokens(
        payload, 
        'refresh',
        this.jwtRefreshConfig.createJwtOptions()
      )
    ]);

    return {
      accessToken,
      refreshToken
    }
    
  }

  async generateTokens(payload, type, asyncConfig: JwtModuleOptions) {

      // Generate Token
    return await this.jwtService.signAsync(
        { ...payload, type },
        {
          secret: asyncConfig.secret,
          expiresIn: asyncConfig.signOptions.expiresIn,
        },
      )

  }

}
