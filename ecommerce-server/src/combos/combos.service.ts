import { BadRequestException, Injectable } from '@nestjs/common';
import { ComboDto } from './dto/combo.dto';
import { Combo } from './entities/combo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { ServicesService } from '../services/services.service';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { GetComboDto } from './dto/get-combo.dto';
import axios from 'axios';

@Injectable()
export class CombosService {
  constructor(
    @InjectRepository(Combo)
    private readonly comboRepository: Repository<Combo>,
    private readonly servicesService: ServicesService,
  ) {
  }

  async create(comboDto: ComboDto): Promise<ComboDto> {
    const services = await this.servicesService.findByIds(comboDto.serviceIds);
    if (!services.length) {
      throw new BadRequestException('Services not found');
    }

    const combo = this.comboRepository.create(comboDto);
    combo.services = services;

    await this.comboRepository.save(combo);
    return comboDto;
  }

  async update(id: number, comboDto: ComboDto): Promise<ComboDto> {
    const existingCombo = await this.comboRepository.findOne({
      where: { id: id },
    });

    const services = await this.servicesService.findByIds(comboDto.serviceIds);

    if (!services.length) {
      throw new BadRequestException('Services not found');
    }

    if (!existingCombo) {
      throw new BadRequestException(`Combo with id ${id} not found`);
    }

    existingCombo.name = comboDto.name;
    existingCombo.description = comboDto.description;
    existingCombo.price = comboDto.price;
    existingCombo.services = services;

    await this.comboRepository.save(existingCombo);

    return comboDto;
  }


  async getCombos(pageOptionsDto: PageOptionsDto, zipCode: string): Promise<PageDto<GetComboDto>> {
    const isZipCodeValid = await this.validateZipCode(zipCode);
    if (!isZipCodeValid) {
     return null;
    }

    const queryBuilder = this.comboRepository.createQueryBuilder('combo');

    queryBuilder
      .leftJoin('combo.services', 'service')
      .addSelect('service.id') // Seleciona o ID do serviço
      .addSelect('service.name') // Seleciona o nome do serviço
      .where('combo.deletedAt IS NULL')
      .orderBy('combo.price', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async remove(id: number) {
    const updateResult: UpdateResult = await this.comboRepository
      .createQueryBuilder()
      .update(Combo)
      .set({ deletedAt: new Date() })
      .where('id = :id', { id })
      .execute();

    if (updateResult.affected === 0) {
      throw new BadRequestException(`Combo with id ${id} not found`);
    }
  }

  async findByIds(combosIds: number[]) {
    if (combosIds && combosIds.length) {
      return await this.comboRepository.find({
        where: {
          id: In(combosIds),
        },
      });
    }
    return [];
  }

  private async validateZipCode(zipCode: string) {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`;
    try {
      const response = await axios.get(url);
      if (response && response.data) {
        const address = response.data;
        return address.localidade == 'Betim';
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}
