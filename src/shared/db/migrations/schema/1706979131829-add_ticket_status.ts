import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTicketStatus1706979131829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `INSERT INTO ticket_status (id,name,type, created_at, created_by) 
             VALUES (1,'Todo', 'TODO', '2024-01-31 17:48:35.410', '00-00000'),
                    (2,'Inprogress', 'INPROGRESS', '2024-01-31 17:48:35.410', '00-00000'),
                    (3,'Deferred', 'DEFERRED', '2024-01-31 17:48:35.410', '00-00000'),
                    (4,'Complete', 'COMPLETE', '2024-01-31 17:48:35.410', '00-00000');
            `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
