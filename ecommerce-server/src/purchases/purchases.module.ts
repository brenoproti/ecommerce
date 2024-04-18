import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { ProductsModule } from '../products/products.module';
import { CombosModule } from '../combos/combos.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    ProductsModule,
    CombosModule,
    ServicesModule,
    TypeOrmModule.forFeature([Purchase])
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
