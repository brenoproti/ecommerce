import { Test, TestingModule } from '@nestjs/testing';
import { CombosService } from './combos.service';
import { Repository } from 'typeorm';
import { Combo } from './entities/combo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Service } from '../services/entities/service.entity';
import { ServicesService } from '../services/services.service';
import { ComboDto } from './dto/combo.dto';

describe('CombosService', () => {
  let service: CombosService;
  let repository: Repository<Combo>
  let serviceService: ServicesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CombosService,
        {
          provide: getRepositoryToken(Combo),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          }
        },
        {
          provide: ServicesService,
          useValue: {
            findByIds: jest.fn().mockResolvedValue([]), // mock service findByIds method
          },
        }
      ],
    }).compile();

    service = module.get<CombosService>(CombosService);
    serviceService = module.get<ServicesService>(ServicesService);
    repository = module.get<Repository<Combo>>(getRepositoryToken(Combo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
