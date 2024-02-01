import { BeforeInsert, BeforeRemove, BeforeUpdate, Column } from "typeorm";

export abstract class BaseActiveEntity {
    @Column({name : 'created_at'})
    createdAt: Date;

    @Column({name : 'created_by'})
    createdBy: string;

    @Column({name : 'updated_at', nullable: true})
    updatedAt?: Date | null;

    @Column({name : 'updated_by',  nullable: true})
    updatedBy?: string | null;

    @Column({name : 'deleted_at',  nullable: true})
    deletedAt?: Date | null;

    @Column({name : 'deleted_by',  nullable: true})
    deletedBy?: string | null;

    @BeforeInsert()
    async beforeInsert() {
        console.log(`LOG ${this.constructor.name} before insert.`);
    }

    @BeforeUpdate()
    async beforeUpdate() {
        console.log(`LOG ${this.constructor.name} before update.`);
    }

    @BeforeRemove()
    async beforeDelete() {
        console.log(`LOG ${this.constructor.name} before update`);
    }
}