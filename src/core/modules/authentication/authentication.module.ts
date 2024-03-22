import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UserRoleEntity } from 'src/infrastructure/entities/user.role.entity';
import { RoleUtilEntity } from 'src/infrastructure/entities/role.util.entity';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { StrategyLocal } from './strategies/local/strategy.local';
import { AuthStrategyJwt } from './strategies/AuthJwt/auth.strategy.jwt';
import { RefreshTokenStrategy } from './strategies/RefreshJwt/refresh.strategy.jwt';
import { JwtAccessConfig } from 'src/shared/configs/jwts/jwt.access.config';
import { JwtRefreshConfig } from 'src/shared/configs/jwts/jwt.refresh.config';

@Module({
  imports:[
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([
      UserEntity,
      UserRoleEntity,
      RoleUtilEntity
    ])
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService, 
    StrategyLocal, 
    AuthStrategyJwt, 
    RefreshTokenStrategy,
    JwtAccessConfig,
    JwtRefreshConfig
  ],
})
export class AuthenticationModule {}
