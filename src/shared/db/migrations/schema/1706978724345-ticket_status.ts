import { MigrationInterface, QueryRunner } from "typeorm";

export class TicketStatus1706978724345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS ticket_status (
                id int PRIMARY KEY,
                name string,
                type string,
                created_at Date,
                created_by text,
                updated_at Date,
                updated_by text,
                deleted_at Date,
                deleted_by text
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
