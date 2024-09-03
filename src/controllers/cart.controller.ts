import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { CartItem } from '../entities/cart-item.entity';
import { AuthGuard } from '@nestjs/passport';

//interfaz de un item del carrito.
interface CartItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

@Controller('cart')
@UseGuards(AuthGuard('jwt'))
export class CartController {
  constructor(private readonly cartService: CartService) {} //inyecta el servicio de carrito.

  @Post('products') //endpoint para agregar un producto al carrito.
  @HttpCode(HttpStatus.CREATED) //devuelve 201 en caso exitoso.
  async addProduct(@Body() { productId, quantity }): Promise<CartItem> {
    return this.cartService.addProduct(productId, quantity);
  }

  @Delete('products/:productId') //endpoint para eliminar un producto del carrito.
  @HttpCode(HttpStatus.NO_CONTENT) //devuelve 204 en caso exitoso.
  async removeProduct(@Param('productId') productId: number): Promise<void> {
    return this.cartService.removeProduct(productId);
  }

  @Put('products/:productId') //endpoint para cambiar la cantidad de un producto en el carrito.
  async changeQuantity(
    @Param('productId') productId: number, //id del producto.
    @Body() { quantity }, //cantidad a cambiar.
  ): Promise<CartItem> {
    return this.cartService.changeQuantity(productId, quantity);
  }

  @Get('products/count') //endpoint para obtener la cantidad de items en el carrito.
  async getItemsCount(): Promise<{ itemsCount: number }> {
    const count = await this.cartService.getItemsCount();
    return { itemsCount: count };
  }

  @Get('total-price') //endpoint para obtener el precio total del carrito.
  async getTotalPrice(): Promise<{ totalPrice: number }> {
    const totalPrice = await this.cartService.getTotalPrice();
    return { totalPrice };
  }

  @Get('products') //endpoint para obtener los items del carrito.
  async getCartItems(): Promise<CartItemResponse[]> {
    const cart = await this.cartService.getOrCreateCart();
    return cart.cartItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));
  }
}
