import { MigrationInterface, QueryRunner } from "typeorm";

export class TicketStatus1706978724345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.ticket_status (
                created_at timestamp NOT NULL,
                created_by varchar NOT NULL,
                updated_at timestamp NULL,
                updated_by varchar NULL,
                deleted_at timestamp NULL,
                deleted_by varchar NULL,
                id serial4 NOT NULL,
                "name" varchar NOT NULL,
                "type" varchar NOT NULL,
                "statusTicketnameId" int4 NULL,
                CONSTRAINT "PK_a39055e902c270197f3711e0ee3" PRIMARY KEY (id),
                CONSTRAINT "REL_13b9703c422ef13e976ed937e2" UNIQUE ("statusTicketnameId"),
                CONSTRAINT "FK_13b9703c422ef13e976ed937e2a" FOREIGN KEY ("statusTicketnameId") REFERENCES public.ticket_entity(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
