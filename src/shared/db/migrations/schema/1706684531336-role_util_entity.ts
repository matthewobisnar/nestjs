import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleUtilEntity1706684531336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(
            `CREATE TABLE IF NOT EXISTS role_util_entity (
                id serial4 NOT NULL,
                role_name TEXT,
                role_desc TEXT,
                created_at DATE,
                created_by TEXT,
                updated_at DATE,
                updated_by TEXT,
                deleted_at DATE,
                deleted_by TEXT,
                CONSTRAINT role_util_entity_pk PRIMARY KEY (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
