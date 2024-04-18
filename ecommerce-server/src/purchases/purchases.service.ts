import { Injectable } from '@nestjs/common';
import { PurchaseDto } from './dto/purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseItem } from '../purchase-items/entities/purchase-item.entity';
import { ItemType } from '../common/constants/item-type.enum';
import { Combo } from '../combos/entities/combo.entity';
import { Service } from '../services/entities/service.entity';
import { Product } from '../products/entities/product.entity';
import { PurchaseStatus } from '../common/constants/purchase-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { PurchaseItemDto } from '../purchase-items/dto/purchase-item.dto';
import { ServicesService } from '../services/services.service';
import { CombosService } from '../combos/combos.service';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly productService: ProductsService,
    private readonly servicesService: ServicesService,
    private readonly combosService: CombosService,
  ) {
  }

  async create(purchaseDto: PurchaseDto, user) {
    const entity: Purchase = new Purchase();

    let totalAmount = 0;

    entity.items = await this.getPurchaseItemsAndCalculateAmount(purchaseDto);
    entity.status = PurchaseStatus.PENDING;
    entity.customer = user;

    entity.totalAmount = entity.items.reduce((a, b) => a + +b.price, 0);
    return this.purchaseRepository.save(entity);
  }

  private async getPurchaseItemsAndCalculateAmount(purchaseDto: PurchaseDto) {
    const items: PurchaseItem[] = [];

    await this.setProducts(items, purchaseDto.items);
    await this.setServices(items, purchaseDto.items);
    await this.setCombos(items, purchaseDto.items);

    return items;
  }

  async setProducts(purchateItems: PurchaseItem[], items: PurchaseItemDto[]) {
    const productsBasic = items.filter(it => it.type == ItemType.PRODUCT).map(it => ({id: it.productId, quantity: it.quantity || 1}));

    const products = await this.productService.findByIds(productsBasic.map(it => it.id));

    if (products.length) {
      products.forEach(p => {
        const item: PurchaseItem = new PurchaseItem();
        item.itemType = ItemType.PRODUCT;
        item.price = p.price;
        const productBasic = productsBasic.find(it => it.id == p.id);
        item.quantity = 1;
        if (productBasic) {
          item.quantity = productBasic.quantity || 1;
        }
        item.price = p.price * item.quantity;

        item.product = p;

        purchateItems.push(item);
      })
    }
  }

  async setServices(purchateItems: PurchaseItem[], items: PurchaseItemDto[]) {
    const serviceIds = items.filter(it => it.type == ItemType.SERVICE).map(it => it.serviceId);

    const services = await this.servicesService.findByIds(serviceIds);

    if (services.length) {
      services.forEach(s => {
        const item: PurchaseItem = new PurchaseItem();
        item.itemType = ItemType.SERVICE;
        item.price = s.price;
        item.service = s;
        purchateItems.push(item);
      })
    }
  }

  async setCombos(purchateItems: PurchaseItem[], items: PurchaseItemDto[]) {
    const combosIds = items.filter(it => it.type == ItemType.COMBO).map(it => it.comboId);

    const combos = await this.combosService.findByIds(combosIds);

    if (combos.length) {
      combos.forEach(c => {
        const item: PurchaseItem = new PurchaseItem();
        item.itemType = ItemType.COMBO;
        item.price = c.price;
        item.combo = c;
        purchateItems.push(item);
      })
    }
  }

  findAll() {
    return `This action returns all purchases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
