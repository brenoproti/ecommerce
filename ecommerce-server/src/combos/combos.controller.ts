import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CombosService } from './combos.service';
import { ComboDto } from './dto/combo.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { GetComboDto } from './dto/get-combo.dto';

@Controller('combos')
export class CombosController {
  constructor(private readonly combosService: CombosService) {
  }

  @Post()
  create(@Body() comboDto: ComboDto) {
    return this.combosService.create(comboDto);
  }

  @Get(':zipCode')
  async getServices(@Param('zipCode') zipCode: string, @Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<GetComboDto>> {
    return this.combosService.getCombos(pageOptionsDto, zipCode);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() comboDto: ComboDto) {
    return this.combosService.update(+id, comboDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combosService.remove(+id);
  }
}
