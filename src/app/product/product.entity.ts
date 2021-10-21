import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  price: number;

  @Column()
  description: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 0 })
  sold: number;
}