import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import * as errorMessages from '../constants/error-messages';
import * as util from 'util';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  //obtener todos los productos.
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  //obtener un producto por su ID.
  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: In([id]) });
    if (!product) {
      throw new NotFoundException(
        util.format(errorMessages.PRODUCT_NOT_FOUND, id),
      );
    }
    return product;
  }

  //crear un nuevo productos.
  async create(productData: Partial<Product>): Promise<Product> {
    const newProduct = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(newProduct);
    return savedProduct;
  }

  //crear un nuevo array de productos.
  async createMany(productsData: Partial<Product>[]): Promise<Product[]> {
    const newProducts = this.productRepository.create(productsData);
    const savedProducts = await this.productRepository.save(newProducts);
    return savedProducts;
  }

  //actualizar un producto existente.
  async update(id: number, productData: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: In([id]) });
    if (!product) {
      throw new NotFoundException(
        util.format(errorMessages.PRODUCT_NOT_FOUND, id),
      );
    }
    Object.assign(product, productData);
    return await this.productRepository.save(product);
  }

  //eliminar un producto.
  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
