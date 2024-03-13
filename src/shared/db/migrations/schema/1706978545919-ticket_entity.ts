import { MigrationInterface, QueryRunner } from "typeorm";

export class TicketEntity1706978545919 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE ticket_entity (
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
                CONSTRAINT "REL_872bf60722bdaff3118a1d2342" UNIQUE (status),
                CONSTRAINT "REL_a60cb0c083243ffb156246ec0e" UNIQUE (assignee),
                CONSTRAINT "FK_872bf60722bdaff3118a1d2342c" FOREIGN KEY (status) REFERENCES ticket_status(id),
                CONSTRAINT "FK_a60cb0c083243ffb156246ec0e1" FOREIGN KEY (assignee) REFERENCES user_entity(id)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
