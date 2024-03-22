import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket/ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UserRoleEntity } from 'src/infrastructure/entities/user.role.entity';
import { RoleUtilEntity } from 'src/infrastructure/entities/role.util.entity';
import { TicketStatus } from 'src/infrastructure/entities/ticket.status.entity';
import { TicketEntity } from 'src/infrastructure/entities/ticket.entity';

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
