import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { In, Repository, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
  }

  async create(createProductDto: ProductDto): Promise<ProductDto> {
    return this.productRepository.save(this.productRepository.create(createProductDto));
  }

  async getProducts(pageOptionsDto: PageOptionsDto): Promise<PageDto<ProductDto>> {

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    queryBuilder
      .where('product.deletedAt IS NULL')
      .orderBy('product.price', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async remove(id: number) {
    const updateResult: UpdateResult = await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ deletedAt: new Date() })
      .where('id = :id', { id })
      .execute();

    if (updateResult.affected === 0) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }
  }

  async update(id: number, productDto: ProductDto): Promise<ProductDto> {
    const existingProduct = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!existingProduct) {
      throw new BadRequestException(`Product with id ${id} not found`);
    }

    existingProduct.name = productDto.name;
    existingProduct.description = productDto.description;
    existingProduct.price = productDto.price;
    existingProduct.stockQuantity = productDto.stockQuantity;
    existingProduct.imageUrl = productDto.imageUrl;
    existingProduct.category = productDto.category;

    await this.productRepository.save(existingProduct);

    return productDto;
  }

  async findByIds(productIds: number[]) {
    if (productIds && productIds.length) {
      return await this.productRepository.find({
        where: {id: In(productIds)}
      })
    }
    return [];

  }
}
