import { MigrationInterface, QueryRunner } from "typeorm";

export class TicketStatus1706978724345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.ticket_status (
                created_at timestamp NOT NULL,
                created_by varchar NOT NULL,
                updated_at timestamp NULL,
                updated_by varchar NULL,
                deleted_at timestamp NULL,
                deleted_by varchar NULL,
                id serial4 NOT NULL,
                "name" varchar NOT NULL,
                "type" varchar NOT NULL,
                CONSTRAINT ticket_status_id PRIMARY KEY (id)
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
