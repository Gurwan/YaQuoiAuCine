import { Controller, Get, Param, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { BoxOfficeService } from 'src/services/boxoffice.service';

@UseGuards(AuthGuard)
@Controller('boxoffice')
export class BoxOfficeController {
  constructor(private readonly boxofficeService: BoxOfficeService) {}

  @Get()
  getAll() {
    return this.boxofficeService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.boxofficeService.get(id);
  }

  @Put(':id')
  async set(@Param('id') id: string, @Body('value') value: string) {
    await this.boxofficeService.set(id, value);
    return { success: true };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.boxofficeService.delete(id);
    return { success: true };
  }
}