import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EncomendaService } from './encomenda.service';
import { CreateEncomendaDto } from './dto/create-encomenda.dto';
import { UpdateEncomendaDto } from './dto/update-encomenda.dto';

@Controller('encomenda')
export class EncomendaController {

  constructor(private readonly encomendaService: EncomendaService) { }

  @Post()
  create(@Body() createEncomendaDto: CreateEncomendaDto) {
    return this.encomendaService.create(createEncomendaDto);
  }

  @Get()
  findAll() {
    return this.encomendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encomendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEncomendaDto: UpdateEncomendaDto) {
    return this.encomendaService.update(+id, updateEncomendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encomendaService.remove(+id);
  }
}
