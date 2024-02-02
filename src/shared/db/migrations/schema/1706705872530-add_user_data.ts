import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserData1706705872530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`INSERT INTO user_entity (id, firstname, lastname, email, password, created_at, created_by) VALUES 
            (1, 'super', 'admin', 'admin@gmail.com', '$2b$10$0LDR52JfT1cR5QVdft0mReVBQzyRuEr2CBL/PYtDWgCRYptk3iiT6', '2024-01-31 17:48:35.410', '00-00000'),
            (2, 'user', 'user', 'user@gmail.com', '$2b$10$0LDR52JfT1cR5QVdft0mReVBQzyRuEr2CBL/PYtDWgCRYptk3iiT6', '2024-01-31 17:48:35.410', '00-00000');`
            )

        queryRunner.query(`INSERT INTO user_role_entity 
                (user_id, role_name, created_at, created_by) 
                VALUES 
                (1, 'ADMIN', '2024-01-31 17:48:35.410', '00-00000'),
                (1, 'USER', '2024-01-31 17:48:35.410', '00-00000'),
                (2, 'USER', '2024-01-31 17:48:35.410', '00-00000');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}

}
