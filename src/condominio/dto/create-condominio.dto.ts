export class CreateCondominioDto {
    authKey: string;
    cnpj: string;
    condominioID?: string;
    idAssociacao?: string;
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
    plano: string;
    vencimento: number;
    formaDePagamento: string;
    sindicoResponsavel?: {
        _id: object;
        nome: string;
        email: string;
    };
    funcionarios?: {
        _id: object;
        active: boolean;
    };
    qtdeBlocos?: number;
    qtdeApartamentos?: number;
    blocos?: {
        blocoID: string;
        bloco: string;
    }[];
    apartamentos?: {
        apartamentoID: string,
        apartamento: string,
        receberNotificacoesEncomendas: boolean,
        moradores: {
            moradorId: string,
            nomeCompleto: string,
            cpf: string,
            email: string,
            telefone: string,
            telefoneEWhatsApp: boolean,
        }[]

    }[];
    faturas?: {
        faturaID: string;
        fatura: string;
        valor: number;
        vencimento: string;
        formaDePagamento: string;
        status: string;
        retornoPgto: {
            valor: number;
        }[]
    };
    moradoresNaoVinculados?: {
        _id: object;
    };
    tipoDeControleEncomenda: 'Código de Barras' | 'Código de Rastreamento' // O condomínio escolhe como cadastrar
    enviaEmail?: boolean;
}
