import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { BaseActiveEntity } from "./base.entity"
import { TicketEntity } from "./ticket.entity"

@Entity({schema: 'public', name: 'ticket_status'})
export class TicketStatus extends BaseActiveEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    type: string

    @OneToOne(() => TicketEntity, status => status.statusUtilName)
    @JoinColumn()
    statusTicketname: TicketEntity
}