import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseActiveEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { RoleUtilEntity } from "./role.util.entity";

@Entity({name: 'user_role_entity'})
export class UserRoleEntity extends BaseActiveEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @Column({name: 'role_name'})
    roleName: string;

    @ManyToOne(() => UserEntity, user => user.roles)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity
}