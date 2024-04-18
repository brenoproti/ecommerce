import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be create a new product with sucess', async() => {
      //Arrange
      const body: ProductDto = {
        category: 'C',
        description: 'D',
        name: 'N',
        imageUrl: 'I',
        price: 10,
        stockQuantity: 5
      }

      const entityMock = {
        ...body,
        id: 1
      } as Product;
      jest.spyOn(service, 'create').mockResolvedValueOnce(entityMock);
      //Act
      const result = await controller.create(body);
      //Assert
      expect(result).toBeDefined();
      expect(service.create).toBeCalledTimes(1);
    })
  })
});
