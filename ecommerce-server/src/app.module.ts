import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { CombosModule } from './combos/combos.module';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { ShoppingCartItemsModule } from './shopping-cart-items/shopping-cart-items.module';
import { PurchasesModule } from './purchases/purchases.module';
import { PurchaseItemsModule } from './purchase-items/purchase-items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: false,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
    }),
    ProductsModule,
    ServicesModule,
    CombosModule,
    UsersModule,
    AddressModule,
    AuthModule,
    ShoppingCartsModule,
    ShoppingCartItemsModule,
    PurchasesModule,
    PurchaseItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
