import * as mongoose from 'mongoose'

export const CondominioSchema = new mongoose.Schema({
    cnpj: String,
    condominioID: String,
    idAssociacao: String,
    razaoSocial: String,
    endereco: String,
    numero: String,
    bairro: String,
    complemento: String,
    cidade: String,
    estado: String,
    cep: String,
    telefone: String,
    telefoneEWhatsApp: Boolean,
    plano: String,
    vencimento: Number,
    formaDePagamento: String,
    sindicoResponsavel: {
        _id: String,
        nome: String,
        cpf: String,
        email: String,
        telefone: String,
        telefoneEWhatsApp: Boolean,
    },
    funcionarios: [
        {
            _id: String,
            active: Boolean,
        }
    ],
    blocos: [
        {
            blocoID: String,
            bloco: String,
        }
    ],
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
    ],
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
    ],
    moradoresNaoVinculados: [
        {
            _id: String,
        }
    ],
    statusActive: Boolean,
    tipoDeControleEncomenda: { // O condomínio escolhe como cadastrar
        type: String,
        enum: ['Código de Barras', 'Código de Rastreamento']
    },
}, {
    timestamps: true,
    versionKey: false
})
