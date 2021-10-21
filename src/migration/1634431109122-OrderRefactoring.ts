import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderRefactoring1634431109122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE orders (
            id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
            product_id int(11) NOT NULL,
            shipping_id varchar(25) NULL,
            customer_name varchar(200) NOT NULL,
            customer_phone varchar(16) NOT NULL,
            customer_email varchar(50) NOT NULL,
            customer_address text NOT NULL,
            payment_type enum('transfer') NOT NULL,
            payment_proof varchar(200) NULL,
            status enum('waiting','approved','shipped','cancel') NOT NULL DEFAULT 'waiting',
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
          )`);
          
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE orders`);
    }

}
