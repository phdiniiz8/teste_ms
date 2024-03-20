import { Injectable } from '@nestjs/common';
import { CreateEncomendaDto } from './dto/create-encomenda.dto';
import { UpdateEncomendaDto } from './dto/update-encomenda.dto';

@Injectable()
export class EncomendaService {
  create(createEncomendaDto: CreateEncomendaDto) {
    return 'This action adds a new encomenda';
  }

  findAll() {
    return `This action returns all encomenda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} encomenda`;
  }

  update(id: number, updateEncomendaDto: UpdateEncomendaDto) {
    return `This action updates a #${id} encomenda`;
  }

  remove(id: number) {
    return `This action removes a #${id} encomenda`;
  }
}
