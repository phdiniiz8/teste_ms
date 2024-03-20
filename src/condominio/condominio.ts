import { Document } from "mongoose";

export class Condominio extends Document {

    cnpj: string;
    condominioID: string;
    razaoSocial: string;
    endereco: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string;
    telefone: string;
    telefoneEWhatsApp: string;
    plano: boolean;
    vencimento: number;
    formaDePagamento: string;
    sindicoResponsavel: {
        nome: string;
        cpf: string;
        email: string;
        telefone: string;
        telefoneEWhatsApp: string;
    };
    funcionarios: [
        {
            _id: String,
            active: Boolean,
        }
    ];
    blocos: [
        {
            blocoID: String,
            bloco: String,
        }
    ];
    apartamentos: [
        {
            apartamentoID: String,
            apartamento: String,
            receberNotificacoesEncomendas: Boolean,
            moradores: [
                {
                    moradorId: String,
                    nomeCompleto: String,
                    cpf: String,
                    email: String,
                    telefone: String,
                    telefoneEWhatsApp: Boolean,
                }
            ]
        }
    ];
    faturas: [
        {
            faturaID: String,
            fatura: String,
            valor: Number,
            vencimento: String,
            formaDePagamento: String,
            status: String,
            retornoPgto: {
                valor: Number,
            }
        }
    ];
    moradoresNaoVinculados: [
        {
            _id: String
        }
    ];
    tipoDeControleEncomenda: string;
    enviaEmail?: boolean;
}
