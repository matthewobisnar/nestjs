import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/db/entities/user.entity';
import { UserRoleEntity } from 'src/shared/db/entities/user.role.entity';
import { RoleUtilEntity } from 'src/shared/db/entities/role.util.entity';
import { UserService } from './services/user/user.service';

@Module({
  imports:[
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
