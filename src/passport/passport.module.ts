import { Module } from '@nestjs/common';
import { PassportController } from './controllers/passport.controller';
import { PassportService } from './services/passport/passport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/db/entities/user.entity';
import { UserRoleEntity } from 'src/shared/db/entities/user.role.entity';
import { RoleUtilEntity } from 'src/shared/db/entities/role.util.entity';
import { AuthLocalStrategy } from './strategies/local/auth.local.strategy';
import { AuthJwtStrategy } from './strategies/jwt/auth.jwt.strategy';
import { UserService } from 'src/user/services/user/user.service';
import { UserModule } from 'src/user/user.module';

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
