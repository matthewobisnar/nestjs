import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleUtilEntity1706684531336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(
            `CREATE TABLE IF NOT EXISTS public.role_util_entity (
                created_at timestamp NOT NULL,
                created_by varchar NOT NULL,
                updated_at timestamp NULL,
                updated_by varchar NULL,
                deleted_at timestamp NULL,
                deleted_by varchar NULL,
                id serial4 NOT NULL,
                role_name varchar NOT NULL,
                role_desc varchar NOT NULL,
                CONSTRAINT "PK_ef66a9cefd9f073df4baae975a9" PRIMARY KEY (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
