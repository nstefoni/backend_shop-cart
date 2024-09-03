import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product) //relacion con el producto.
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartItems) //relacion con el carrito.
  cart: Cart;
}
