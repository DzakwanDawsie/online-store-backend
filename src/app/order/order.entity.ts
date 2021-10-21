import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  shipping_id: number;

  @Column()
  customer_name: string;

  @Column()
  customer_phone: number;

  @Column()
  customer_email: string;

  @Column()
  customer_address: string;

  @Column({ type: 'enum', enum: ['transfer'] })
  payment_type: string;

  @Column()
  payment_proof: string;

  @Column({ type: 'enum', enum: ['waiting','approved','shipped','cancel'] })
  status: string;

  @Column()
  created_at: string;

  @OneToOne(() => Product)
  @JoinColumn({name: "product_id", referencedColumnName:"id"})
  product: Product;
}