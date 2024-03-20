import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanoDto } from './create-plano.dto';

export class UpdatePlanoDto extends PartialType(CreatePlanoDto) {
    _id?: object;
    descricao?: string;
    maxBlocos?: number;
    maxApartamentos?: number;
    maxEncomendas?: number
    preco?: number;
}
