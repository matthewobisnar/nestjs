import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleUtilData1706705495204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `INSERT INTO role_util_entity (id, role_name, role_desc, created_at, created_by) VALUES 
            (1, 'USER', 'User role', '2024-01-31 17:48:35.410', '00-00000'),
            (2, 'ADMIN', 'Admin role', '2024-01-31 17:48:35.410', '00-00000');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
