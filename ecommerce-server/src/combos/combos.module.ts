import { Module } from '@nestjs/common';
import { CombosService } from './combos.service';
import { CombosController } from './combos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combo } from './entities/combo.entity';
import { Service } from '../services/entities/service.entity';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ServicesModule, TypeOrmModule.forFeature([Combo]), TypeOrmModule.forFeature([Service])],
  controllers: [CombosController],
  providers: [CombosService],
  exports: [CombosService]
})
export class CombosModule {
}
