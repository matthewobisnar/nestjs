import { Module } from '@nestjs/common';
import { PassportController } from './controllers/passport.controller';
import { PassportService } from './services/passport/passport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/db/entities/user.entity';
import { UserRoleEntity } from 'src/shared/db/entities/user.role.entity';
import { RoleUtilEntity } from 'src/shared/db/entities/role.util.entity';
import { AuthLocalStrategy } from './strategies/local/auth.local.strategy';

@Module({
  imports:[
    PassportModule,
    TypeOrmModule.forFeature([
      UserEntity, 
      UserRoleEntity, 
      RoleUtilEntity
    ])
  ],
  controllers: [PassportController],
  providers: [PassportService, AuthLocalStrategy]
})
export class PassportModule {}
