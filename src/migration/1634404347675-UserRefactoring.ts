import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactoring1634404347675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE users (
            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username varchar(255) NOT NULL,
            fullname varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            role enum('customer','admin') NOT NULL,
            access_token varchar(200) NULL DEFAULT NULL,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
          )`);

          await queryRunner.query(`INSERT INTO users (username, fullname, email, password, role) VALUES ('admin', 'Administrator', 'admin@email', 'admin123', 'admin')`);
          await queryRunner.query(`INSERT INTO users (username, fullname, email, password, role) VALUES ('customer', 'Customer', 'customer@email', 'customer123', 'customer')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users`);
    }

}
