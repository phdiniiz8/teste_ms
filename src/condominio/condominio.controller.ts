import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { CondominioService } from './condominio.service';
import { CreateCondominioDto } from './dto/create-condominio.dto';
import { UpdateCondominioDto } from './dto/update-condominio.dto';
import { AuthGuard } from 'src/user-auth/auth.guard';
import { AuthGuardCondominio } from './auth.guard.condominio';
import { UserAuthService } from 'src/user-auth/user-auth.service';

@Controller('condominio')
export class CondominioController {

  constructor(
    private readonly condominioService: CondominioService,
    ) { }

  @Post()
  // @UseGuards(AuthGuardCondominio)
  create(@Body() createCondominioDto: CreateCondominioDto) {
    return this.condominioService.create(createCondominioDto);
  }

  @Get()
  findAll() {
    return this.condominioService.findAll();
  }

  // ? OK
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.condominioService.findOneByObjectId(id);
  }

  // ? OK
  @Get('find/manager/:email')
  async findOneSindico(@Param('email') email: string) {

    const { sindicoResponsavel: { nome }, condominioID, statusActive } = await this.condominioService.findOneSindico(email);

    const data = {
      condominioID,
      nome,
      statusActive
    }

    return data
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCondominioDto: UpdateCondominioDto) {
    return this.condominioService.update({ id, updateCondominioDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.condominioService.remove(+id);
  }
}
