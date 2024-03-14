import { MigrationInterface, QueryRunner } from "typeorm";

export class TicketEntity1806978745959 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ticket_entity (
                created_at timestamp NOT NULL,
                created_by varchar NOT NULL,
                updated_at timestamp NULL,
                updated_by varchar NULL,
                deleted_at timestamp NULL,
                deleted_by varchar NULL,
                id serial4 NOT NULL,
                title varchar NOT NULL,
                status int4 NOT NULL,
                assignee int4 NOT NULL,
                description varchar NOT NULL,
                CONSTRAINT "PK_4c23bb38e4d566808a73a5af6ec" PRIMARY KEY (id),
                FOREIGN KEY (status) REFERENCES ticket_status(id),
                FOREIGN KEY (assignee) REFERENCES user_entity(id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
