/* eslint-disable prettier/prettier */
export interface SindicoProps { // Síndico
    _id: string;
    responsavelJuridico: string;
    cnpj: string;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    email: string;
    senha: string;
    plano: number;
}

export interface CondominioProps {
    _id: string;
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
}

export interface ResponsavelProps { // Responsável (funcionário)
    _id: string;
    tipo: 'Entregue pela Transportadora (Disponível para Retirada)' | 'Entregue para o Destinatário (Retirado)';
    nome: string;
    cpf: string;
    email: string;
    senha: string;
}

export interface BlocosDoCondominio { // Blocos do condomínio
    _id: string;
    quantidadeDeBlocos: number;
    quantidadeDeApartamentosPorBloco: number;
}

export interface ApartamentosProps { // Apartamentos do condomínio
    _id: string;
    moradores: MoradoresProps[]
}

export interface MoradoresProps {
    _id: string;
    bloco: string;
    apartamento: string;
    avisoDeRecebimento: boolean;
    nomeCompleto: string;
    cpf: string;
    email: string;
    senha: string;
    telefone: string;
    telefoneEWhatsApp: boolean;
}

export interface TransportadoraProps {
    _id: string;
    nomeTransportadora: string;
    nomeResponsavel: string;
    identificacao: string
}

export interface MercadoriaProps {
    _id: string;
    destinatario: MoradoresProps['nomeCompleto'];
    codigoInterno: string;
    status: 'Aguardando Retirada' | 'Retirado';
    tipo: 'Pacote' | 'Carta Registrada (AR)' | 'Envelope (AR)' | 'Objeto'
    codigoDeRastreio?: string;
}

export interface EntradaDeMercadoriaProps { // Entregue pela Transportadora (Disponível para Retirada)
    _id: string;
    codigo: string;
    data: Date;
    entreguePor: TransportadoraProps;
    recebidoPor: ResponsavelProps['nome']
    destinatario: MoradoresProps['nomeCompleto'];


}

export interface EntregaDeMercadoriaProps { // Entregue para o Destinatário (Retirado)
    _id: string;

}
