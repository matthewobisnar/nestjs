import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseActiveEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { RoleUtilEntity } from "./role.util.entity";

@Entity({name: 'user_role_entity'})
export class UserRoleEntity extends BaseActiveEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @Column({name: 'role_id'})
    roleId: number;

    @ManyToOne(() => UserEntity, user => user.roles)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToOne(() => RoleUtilEntity, role => role.role)
    @JoinColumn({name: 'role_id'})
    role: RoleUtilEntity
}