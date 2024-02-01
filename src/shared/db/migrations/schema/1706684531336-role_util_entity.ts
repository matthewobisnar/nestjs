import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleUtilEntity1706684531336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`PRAGMA foreign_keys=on`);
        queryRunner.query(
            `CREATE TABLE IF NOT EXISTS role_util_entity (
                id INTEGER PRIMARY KEY,
                role_name TEXT,
                role_desc TEXT,
                created_at DATE,
                created_by TEXT,
                updated_at DATE,
                updated_by TEXT,
                deleted_at DATE,
                deleted_by TEXT
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
