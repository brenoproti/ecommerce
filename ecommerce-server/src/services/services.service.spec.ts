import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceDto } from './dto/service.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { Order } from 'src/common/constants/order.enum';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { BadRequestException } from '@nestjs/common';

describe('ServicesService', () => {
  let service: ServicesService;
  let repository: Repository<Service>;

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
        ServicesService,
        {
          provide: getRepositoryToken(Service),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(() => queryBuilderMock),
          },
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    repository = module.get<Repository<Service>>(getRepositoryToken(Service));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should be save a new service with success', async () => {
      //Arrange
      const data: ServiceDto = {
        description: 'D',
        name: 'N',
        price: 10,
      };

      const entityMock = {
        ...data,
        id: 1,
      } as Service;

      jest.spyOn(repository, 'create').mockReturnValueOnce(entityMock);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(entityMock);
      //Act
      const result = await service.create(data);
      //Assert
      expect(result).toBeDefined();
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.save).toBeCalledTimes(1);
      expect(result.id != null).toBe(true);
    });
  });

  describe('get', () => {
    it('should return a PageDto of ServiceDto', async () => {
      const pageOptionsDto: PageOptionsDto = {
        order: Order.ASC,
        skip: 0,
        take: 10,
      };

      const itemCount = 20;
      const entities = [{ id: 1, name: 'Service 1', price: 10 }, { id: 2, name: 'Service 2', price: 20 }];

      jest.spyOn(queryBuilderMock, 'getCount').mockResolvedValue(itemCount);
      jest.spyOn(queryBuilderMock, 'getRawAndEntities').mockResolvedValueOnce({ entities });

      const result = await service.getServices(pageOptionsDto);

      expect(result).toBeInstanceOf(PageDto);
      expect(result.data).toEqual(entities);
      expect(result.meta).toEqual(expect.any(PageMetaDto));
    });
  });

  describe('update', () => {
    it('should update a service', async () => {
      const id = 1;
      const data: ServiceDto = {
        description: 'D',
        name: 'N',
        price: 10,
      };

      const existingService = { id: 1, ...data } as Service;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingService);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(existingService);

      const updatedService = await service.update(id, data);

      expect(updatedService).toEqual({ ...data });
    });

    it('should throw NotFoundException if service not found', async () => {
      const id = 1;
      const data: ServiceDto = {
        description: 'D',
        name: 'N',
        price: 10,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.update(id, data)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a service', async () => {
      const id = 1;
      const updateResult = { affected: 1 };

      queryBuilderMock.execute.mockResolvedValue(updateResult);

      await service.remove(id);

      expect(queryBuilderMock.update).toHaveBeenCalledWith(Service);
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
