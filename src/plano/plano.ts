import { Document } from "mongoose";

export class Plano extends Document {
    _id: string;
    descricao: string;
    maxBlocos: number;
    maxApartamentos: number;
    maxEncomendas: number
    preco: number;
}
