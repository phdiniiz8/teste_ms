import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { AuthGuardPlano } from './auth.guard.plano';

@Controller('planos')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) { }

  @Post()
  @UseGuards(AuthGuardPlano)
  create(@Body() createPlanoDto: CreatePlanoDto) {
    return this.planoService.create(createPlanoDto);
  }

  @Get()
  findAll() {

    return this.planoService.findAll();

  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.planoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanoDto: UpdatePlanoDto) {

    return this.planoService.update(id, updatePlanoDto);
  }

  @Delete(':id') // Validar PIN
  async deleteUser(@Param('id') id: string) {

    return await this.planoService.deletePlanCreated(id);
  }
  // @Delete(':id')
  // delete(@Param('id') id: string) {

  //   return this.planoService.deleteOne(id);
  // }
}
