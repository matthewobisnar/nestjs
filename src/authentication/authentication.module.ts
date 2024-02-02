import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../shared/db/entities/user.entity';
import { UserRoleEntity } from 'src/shared/db/entities/user.role.entity';
import { RoleUtilEntity } from 'src/shared/db/entities/role.util.entity';
import { UtilityService } from './services/utility/utility.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    UserModule,
    TypeOrmModule.forFeature([
      UserEntity, 
      UserRoleEntity, 
      RoleUtilEntity
    ])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UtilityService]
})
export class AuthenticationModule {}
