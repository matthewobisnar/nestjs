import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRole1706678013953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        queryRunner.query(`PRAGMA foreign_keys=on`);
        queryRunner.query(
            `CREATE TABLE IF NOT EXISTS user_role_entity (
                id INTEGER PRIMARY KEY,
                user_id INTEGER,
                role_id INTEGER,
                created_at DATE,
                created_by TEXT,
                updated_at DATE,
                updated_by TEXT,
                deleted_at DATE,
                deleted_by TEXT,
                FOREIGN KEY (user_id) REFERENCES user_entity(id),
                FOREIGN KEY (role_id) REFERENCES role_util_entity(id)
            )`
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}