import { MigrationInterface, QueryRunner } from "typeorm";

export class TicketEntity1706978545919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE IF NOT EXISTS ticket_entity (
                id int PRIMARY KEY,
                title string,
                status number,
                assignee number,
                description string,
                created_at Date,
                created_by text,
                updated_at Date,
                updated_by text,
                deleted_at Date,
                deleted_by text,
                FOREIGN KEY (assignee) REFERENCES user_entity (id),
                FOREIGN KEY (status) REFERENCES role_util_entity (id)
              );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
