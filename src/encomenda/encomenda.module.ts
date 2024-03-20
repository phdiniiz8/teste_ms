import { Module } from '@nestjs/common';
import { EncomendaService } from './encomenda.service';
import { EncomendaController } from './encomenda.controller';

@Module({
  controllers: [EncomendaController],
  providers: [EncomendaService],
})
export class EncomendaModule {}
