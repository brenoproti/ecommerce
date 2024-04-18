import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceDto } from './dto/service.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {
  }

  @Post()
  create(@Body() serviceDto: ServiceDto) {
    return this.servicesService.create(serviceDto);
  }

  @Get()
  async getServices(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ServiceDto>> {
    return this.servicesService.getServices(pageOptionsDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() serviceDto: ServiceDto) {
    return this.servicesService.update(+id, serviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
