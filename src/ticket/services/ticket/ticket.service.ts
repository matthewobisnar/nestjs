import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from 'src/shared/db/entities/ticket.entity';
import { TicketStatus } from 'src/shared/db/entities/ticket.status.entity';
import { CreateTicketDto } from 'src/shared/dtos/create.ticket.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {

    constructor(
        @InjectRepository(TicketEntity) private readonly ticketEntityRepository: Repository<TicketEntity>,
        @InjectRepository(TicketStatus) private readonly ticketStatusRepository: Repository<TicketStatus>
    ) {}

    async getTicketStatus() {
        return await this.ticketStatusRepository.find();
    }

    async getAllTickets() {
        return await this.ticketEntityRepository.find({
            relations: ['statusUtilName', 'assigneTicket']
        });
    }

    async getTicketById(id: number) {
        return await this.ticketEntityRepository.findOne({
            where: {id}
        });
    }

    async getTicketByUserId(assignee: number) {
        return await this.ticketEntityRepository.find({
            where: {assignee}
        });
    }

    async createTicket(ticket: CreateTicketDto) {

        try {

          const ticketEntity =  this.ticketEntityRepository.create({
            ...ticket, 
            createdAt: new Date(), 
            createdBy: ticket.assignee.toString()
          });

          console.log(ticketEntity);

          return await this.ticketEntityRepository.save(ticketEntity);
        
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async updateTicket(id: number, ticketEntity: Partial<TicketEntity>) {
       
        try {

            const ticket = this.ticketEntityRepository.create({
                id, 
                ...ticketEntity,
                updatedAt: new Date(), 
                updatedBy: id.toString()
            });

            return await this.ticketEntityRepository.save(ticket);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async deleteTicketById(id: number) {
        return await this.ticketEntityRepository.delete(id);
    }

}