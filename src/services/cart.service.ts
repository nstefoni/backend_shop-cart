import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';
import { Product } from '../entities/product.entity';
import * as errorMessages from '../constants/error-messages';
import * as util from 'util';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  //trae o crea el carrito.
  public async getOrCreateCart(): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      relations: ['cartItems', 'cartItems.product'],
    });

    if (!cart) {
      cart = this.cartRepository.create();
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  //agrega un producto al carrito.
  async addProduct(productId: number, quantity: number): Promise<CartItem> {
    if (quantity <= 0) {
      throw new BadRequestException(errorMessages.INVALID_QUANTITY);
    }

    const cart = await this.getOrCreateCart();
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException(
        util.format(errorMessages.PRODUCT_NOT_FOUND, productId),
      );
    }

    let cartItem = cart.cartItems.find((item) => item.product.id === productId);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepository.create({ cart, product, quantity });
      cart.cartItems.push(cartItem);
    }

    await this.cartRepository.save(cart);
    return cartItem;
  }

  //elimina un producto del carrito.
  async removeProduct(productId: number): Promise<void> {
    const cart = await this.getOrCreateCart();
    const cartItem = cart.cartItems.find(
      (item) => item.product.id === productId,
    );

    if (!cartItem) {
      throw new NotFoundException(
        util.format(errorMessages.PRODUCT_NOT_IN_CART, productId),
      );
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.id !== productId,
    );
    await this.cartRepository.save(cart);
  }

  //cambia la cantidad de un producto en el carrito.
  async changeQuantity(productId: number, quantity: number): Promise<CartItem> {
    if (quantity <= 0) {
      throw new BadRequestException(errorMessages.INVALID_QUANTITY);
    }

    const cart = await this.getOrCreateCart();
    const cartItem = cart.cartItems.find(
      (item) => item.product.id === productId,
    );

    if (!cartItem) {
      throw new NotFoundException(
        util.format(errorMessages.PRODUCT_NOT_FOUND, productId),
      );
    }

    cartItem.quantity = quantity;
    await this.cartRepository.save(cart);
    return cartItem;
  }

  //obtiene el número de productos en el carrito.
  async getItemsCount(): Promise<number> {
    const cart = await this.getOrCreateCart();
    return cart.cartItems.length;
  }

  //calcula el precio total del carrito.
  async getTotalPrice(): Promise<number> {
    const cart = await this.getOrCreateCart();
    if (cart.cartItems.length === 0) {
      throw new BadRequestException(errorMessages.CART_IS_EMPTY);
    }
    return cart.cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    );
  }
}
