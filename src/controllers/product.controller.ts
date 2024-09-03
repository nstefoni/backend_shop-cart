import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get() //implementa el endpoint para obtener todos los productos.
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id') //implementa el endpoint para obtener un producto por su ID.
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post() //implementa el endpoint para crear un nuevo producto.
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.create(productData);
  }

  @Post() //implementa el endpoint para crear un nuevo array de productos.
  @HttpCode(HttpStatus.CREATED)
  async createMany(
    @Body() productsData: Partial<Product>[],
  ): Promise<Product[]> {
    return this.productService.createMany(productsData);
  }

  @Put(':id') //implementa el endpoint para actualizar un producto existente.
  async update(
    @Param('id') id: number,
    @Body() productData: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(id, productData);
  }

  @Delete(':id') //implementa el endpoint para eliminar un producto.
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
