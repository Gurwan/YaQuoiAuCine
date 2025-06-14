import { Controller, Get, Param, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { BoxofficeService } from 'src/services/boxoffice.service';
import { MovieJson } from 'src/interfaces/movie.interface';

@UseGuards(AuthGuard)
@Controller('admin')
export class BoxofficeController {
  constructor(private readonly boxofficeService: BoxofficeService) { }

  @Get()
  getAll() {
    return this.boxofficeService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.boxofficeService.get(id);
  }

  @Put(':id')
  async set(@Param('id') id: string, @Body() value: MovieJson) {
    await this.boxofficeService.set(id, value);
    return { success: true };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.boxofficeService.delete(id);
    return { success: true };
  }
}