import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceDto } from './dto/service.dto';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {
  }

  async create(serviceDto: ServiceDto): Promise<ServiceDto> {
    return this.serviceRepository.save(this.serviceRepository.create(serviceDto));
  }

  async update(id: number, serviceDto: ServiceDto): Promise<ServiceDto> {
    const existingService = await this.serviceRepository.findOne({
      where: { id: id },
    });

    if (!existingService) {
      throw new BadRequestException(`Service with id ${id} not found`);
    }

    existingService.name = serviceDto.name;
    existingService.description = serviceDto.description;
    existingService.price = serviceDto.price;

    await this.serviceRepository.save(existingService);

    return serviceDto;
  }

  async getServices(pageOptionsDto: PageOptionsDto): Promise<PageDto<ServiceDto>> {
    const queryBuilder = this.serviceRepository.createQueryBuilder('service');

    queryBuilder
      .where('service.deletedAt IS NULL')
      .orderBy('service.price', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async remove(id: number) {
    const updateResult: UpdateResult = await this.serviceRepository
      .createQueryBuilder()
      .update(Service)
      .set({ deletedAt: new Date() })
      .where('id = :id', { id })
      .execute();

    if (updateResult.affected === 0) {
      throw new BadRequestException(`Service with id ${id} not found`);
    }
  }

  async findByIds(ids: number[]): Promise<Service[]> {
    if (ids && ids.length) {
      return await this.serviceRepository.find({
        where: {
          id: In(ids),
        },
      });
    }
    return [];
  }
}
