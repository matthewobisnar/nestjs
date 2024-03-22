import { Module } from '@nestjs/common';
import { PassportController } from './controllers/passport.controller';
import { PassportService } from './services/passport/passport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthLocalStrategy } from './strategies/local/auth.local.strategy';
import { AuthJwtStrategy } from './strategies/jwt/auth.jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UserRoleEntity } from 'src/infrastructure/entities/user.role.entity';
import { RoleUtilEntity } from 'src/infrastructure/entities/role.util.entity';

@Module({
  imports:[
    PassportModule,
    UserModule,
    TypeOrmModule.forFeature([
      UserEntity, 
      UserRoleEntity, 
      RoleUtilEntity
    ])
  ],
  controllers: [PassportController],
  providers: [PassportService, AuthLocalStrategy, AuthJwtStrategy]
})
export class PassportModule {}
