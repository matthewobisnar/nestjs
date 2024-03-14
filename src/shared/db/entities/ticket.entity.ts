import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseActiveEntity } from "./base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { TicketStatus } from "./ticket.status.entity";
import { UserEntity } from "./user.entity";

@Entity({schema: 'public', name: 'ticket_entity'})
export class TicketEntity extends BaseActiveEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    title: string

    @ApiProperty()
    @Column()
    status: number
    
    @ApiProperty()
    @Column()
    assignee: number

    @ApiProperty()
    @Column()
    description: string

    @OneToOne(() => TicketStatus, status => status.statusTicketname)
    @JoinColumn({name: 'status'})
    statusUtilName: TicketStatus

    // @OneToOne(() => UserEntity, (assigneTicket) => assigneTicket.ticket)
    // @JoinColumn({name: 'assignee'})
    // assigneTicket: UserEntity
}