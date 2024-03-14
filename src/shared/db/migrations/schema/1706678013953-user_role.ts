import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRole1706678013953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE IF NOT EXISTS public.user_role_entity (
                id serial4 NOT NULL,
                user_id INTEGER,
                role_name TEXT,
                created_at DATE,
                created_by TEXT,
                updated_at DATE,
                updated_by TEXT,
                deleted_at DATE,
                deleted_by TEXT,
                FOREIGN KEY (user_id) REFERENCES public.user_entity (id),
                CONSTRAINT user_role_entity_pk PRIMARY KEY (id)
            );`
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
