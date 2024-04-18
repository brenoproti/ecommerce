import { Test, TestingModule } from '@nestjs/testing';
import { CombosController } from './combos.controller';
import { CombosService } from './combos.service';
import { ServicesService } from '../services/services.service';

describe('CombosController', () => {
  let controller: CombosController;
  let service: CombosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombosController],
      providers: [
        {
          provide: CombosService,
          useValue: {
            create: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<CombosController>(CombosController);
    service = module.get<CombosService>(CombosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
