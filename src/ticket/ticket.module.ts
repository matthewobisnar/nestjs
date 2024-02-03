import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket/ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/shared/db/entities/user.entity';
import { UserRoleEntity } from 'src/shared/db/entities/user.role.entity';
import { RoleUtilEntity } from 'src/shared/db/entities/role.util.entity';
import { TicketEntity } from 'src/shared/db/entities/ticket.entity';
import { TicketStatus } from 'src/shared/db/entities/ticket.status.entity';

@Module({
  imports:[
    UserModule,
    TypeOrmModule.forFeature([
      UserEntity, 
      UserRoleEntity, 
      RoleUtilEntity,
      TicketEntity,
      TicketStatus
    ])
  ],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
