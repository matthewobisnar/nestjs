import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseActiveEntity } from "./base.entity";
import { UserRoleEntity } from "./user.role.entity";
import { TicketEntity } from "./ticket.entity";

@Entity({name: "user_entity"})
export class UserEntity extends BaseActiveEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => UserRoleEntity, roles => roles.user, { onDelete: 'CASCADE' })
    roles: UserRoleEntity[];

    @OneToOne(() => TicketEntity, ticket => ticket.assigneTicket)
    @JoinColumn()
    ticket: TicketEntity
}