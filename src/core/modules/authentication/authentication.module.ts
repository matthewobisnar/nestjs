import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UserRoleEntity } from 'src/infrastructure/entities/user.role.entity';
import { RoleUtilEntity } from 'src/infrastructure/entities/role.util.entity';
import { UtilityService } from './services/utility/utility.service';

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
