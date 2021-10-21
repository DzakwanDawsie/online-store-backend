import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductRefactoring1634404322869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE products (
            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name varchar(255) NOT NULL,
            price int(11) NOT NULL DEFAULT '0',
            description varchar(255) NOT NULL,
            active tinyint(4) NOT NULL DEFAULT '1',
            stock int(11) NOT NULL DEFAULT '0',
            sold int(11) NOT NULL DEFAULT '0'
          )`);

        await queryRunner.query(`INSERT INTO products (name, price, description, active, stock, sold) VALUES ('Samsung A32', '3000000', 'Awesome Screen, Awesom Camera, Long lasting batery life', '1', '10', '0')`);
        await queryRunner.query(`INSERT INTO products (name, price, description, active, stock, sold) VALUES ('Samsung Z Flip', '20000000', 'Samsung Z Flip (HP Lipat)', '1', '2', '5')`);
        await queryRunner.query(`INSERT INTO products (name, price, description, active, stock, sold) VALUES ('Poco F3 Pro', '4500000', 'Flagship Killer', '1', '5', '5')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE products`);
    }

}
