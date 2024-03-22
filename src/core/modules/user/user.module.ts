import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user/user.service';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UserRoleEntity } from 'src/infrastructure/entities/user.role.entity';
import { RoleUtilEntity } from 'src/infrastructure/entities/role.util.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtAccessConfig } from 'src/shared/configs/jwts/jwt.access.config';

@Module({
  imports:[
    JwtModule.registerAsync({
      global: false,
      imports: [ConfigModule],
      useClass: JwtAccessConfig,
    }),
    TypeOrmModule.forFeature([
      UserEntity, 
      UserRoleEntity, 
      RoleUtilEntity
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
