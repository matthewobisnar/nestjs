import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1706676224375 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.user_entity (
                id serial4 NOT NULL,
                firstname TEXT,
                lastname TEXT,
                email TEXT,
                password TEXT,
                created_at DATE,
                created_by TEXT,
                updated_at DATE,
                updated_by TEXT,
                deleted_at DATE,
                deleted_by TEXT,
                CONSTRAINT user_entity_pk PRIMARY KEY (id)
            )`
        );
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
