import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Post()
  create(@Body() productDto: ProductDto) {
    return this.productsService.create(productDto);
  }

  @Get()
  async getProducts(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ProductDto>> {
    return this.productsService.getProducts(pageOptionsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() productDto: ProductDto) {
    return this.productsService.update(+id, productDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
