import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { ShippingThresholdService } from './services/shipping-threshold.service';
import { ShippingThresholdController } from './controllers/shipping-threshold.controller';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Product, Cart, CartItem, User],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Product, Cart, CartItem]),
    AuthModule,
  ],
  controllers: [ProductController, CartController, ShippingThresholdController],
  providers: [
    ProductService,
    CartService,
    ShippingThresholdService,
    JwtStrategy,
  ],
})
export class AppModule {}
