import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
  @Column()
  thumbnail: string;

  @Column()
  sellerName: string;

  @Column()
  sellerId: number;

  @Column()
  availableQuantity: number;
}
