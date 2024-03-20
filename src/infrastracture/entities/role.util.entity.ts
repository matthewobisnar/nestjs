import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseActiveEntity } from "./base.entity";
import { UserRoleEntity } from "./user.role.entity";

@Entity({name: 'role_util_entity'})
export class RoleUtilEntity extends BaseActiveEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({name: "role_name"})
    roleName: string;

    @Column({name: "role_desc"})
    roleDesc: string;
}