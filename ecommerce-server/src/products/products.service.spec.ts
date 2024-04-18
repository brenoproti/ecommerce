import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { Order } from 'src/common/constants/order.enum';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  let queryBuilderMock: any;

  beforeEach(async () => {
    queryBuilderMock = {
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getCount: jest.fn(),
      getRawAndEntities: jest.fn(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(() => queryBuilderMock),
          }
        }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should be save a new product with success', async() => {
      //Arrange
      const data: ProductDto = {
        category: 'C',
        description: 'D',
        name: 'N',
        imageUrl: 'I',
        price: 10,
        stockQuantity: 5
      }

      const entityMock = {
        ...data,
        id: 1
      } as Product;

      jest.spyOn(repository, 'create').mockReturnValueOnce(entityMock);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(entityMock);
      //Act
      const result = await service.create(data);
      //Assert
      expect(result).toBeDefined();
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.save).toBeCalledTimes(1);
      expect(result.id != null).toBe(true);
    })
  })

  describe('get', () => {
    it('should return a PageDto of ProductDto', async () => {
      const pageOptionsDto: PageOptionsDto = {
        order:  Order.ASC,
        skip: 0,
        take: 10,
      };
  
      const itemCount = 20;
      const entities = [{ id: 1, name: 'Product 1', price: 10 }, { id: 2, name: 'Product 2', price: 20 }];
  
      jest.spyOn(queryBuilderMock, 'getCount').mockResolvedValue(itemCount);
      jest.spyOn(queryBuilderMock, 'getRawAndEntities').mockResolvedValueOnce({ entities });

      const result = await service.getProducts(pageOptionsDto);
  
      expect(result).toBeInstanceOf(PageDto);
      expect(result.data).toEqual(entities);
      expect(result.meta).toEqual(expect.any(PageMetaDto));
    });
  })

  describe('update', () => {
    it('should update a product', async () => {
      const id = 1;
      const data: ProductDto = {
        category: 'C',
        description: 'D',
        name: 'N',
        imageUrl: 'I',
        price: 10,
        stockQuantity: 5
      }

      const existingProduct = { id: 1, ...data} as Product;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingProduct);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(existingProduct);

      const updatedProduct = await service.update(id, data);

      expect(updatedProduct).toEqual({ ...data });
    });

    it('should throw BadRequestException if product not found', async () => {
      const id = 1;
      const data: ProductDto = {
        category: 'C',
        description: 'D',
        name: 'N',
        imageUrl: 'I',
        price: 10,
        stockQuantity: 5
      }

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.update(id, data)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const id = 1;
      const updateResult = { affected: 1 };

  
      queryBuilderMock.execute.mockResolvedValue(updateResult);

      await service.remove(id);

      expect(queryBuilderMock.update).toHaveBeenCalledWith(Product);
      expect(queryBuilderMock.set).toHaveBeenCalledWith({ deletedAt: expect.any(Date) });
      expect(queryBuilderMock.where).toHaveBeenCalledWith('id = :id', { id });
      expect(queryBuilderMock.execute).toHaveBeenCalled();
    });

    it('should throw an error if entity not found', async () => {
      const id = 1;
      const updateResult = { affected: 0 }; 

      
      queryBuilderMock.execute.mockResolvedValue(updateResult);

      await expect(service.remove(id)).rejects.toThrow(BadRequestException);
    });
  });
});
