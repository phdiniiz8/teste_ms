import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plano } from './plano';

@Injectable()
export class PlanoService {

  constructor(@InjectModel('Plano') private readonly planoModel: Model<Plano>) { }

  async create(createPlanoDto: CreatePlanoDto) {

    return await this.planoModel.create(createPlanoDto)
  }

  async findAll() {

    return await this.planoModel.find({})
  }

  async findOne(id: string) {
    const plano = await this.planoModel.findById(id)

    if (!plano) {
      throw new NotFoundException('Plano não encontrado.')
    }

    return plano
  }

  async update(id: string, updatePlanoDto: UpdatePlanoDto) {

    if (!await this.planoModel.findById(id)) {
      throw new NotFoundException('Plano não encontrado.')
    }

    if (!await this.planoModel.updateOne({ _id: id }, { ...updatePlanoDto })) {

      throw new NotFoundException('Erro durante a atualização do plano.')
    }

    const response = {
      statusCode: HttpStatus.OK,
      message: 'Plano atualizado com sucesso!',
      data: await this.planoModel.findOne({ _id: id })
    }

    throw new HttpException(response, HttpStatus.OK)
  }

  async deletePlanCreated(id: string) {

    if (!await this.planoModel.findById(id)) {
      throw new NotFoundException('Plano não encontrado.')
    }

    await this.planoModel.findByIdAndDelete({ _id: id })

    throw new HttpException('Plano excluído com sucesso.', HttpStatus.OK)

  }
}
