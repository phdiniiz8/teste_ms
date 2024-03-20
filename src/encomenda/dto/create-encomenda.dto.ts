export class CreateEncomendaDto {
  remetente: {
    nomeRemetente: string; // Remetente original
    empresaTransportadora: string; // Correios / Transportadora
    nomeResponsavelEntrega: string,
    cpf?: string
  };
  destinatário: string; // Morador
  tipoEncomenda: 'Encomenda' | 'Carta' | 'Outros'
  volumes: number; // Quantidade
  observacoes?: string; // Se houve avaria ou algo do tipo, alguma informação para o morador sobre a mercadoria...
  dataChegada: string; // 2024-03-12 12:00:00
  
  codBarras?: string; // Código de barras da encomenda
  codRastreamento?: string; // Código de rastreamento da encomenda
  status: 'Aguardando Retirada' | 'Entregue ao destinatário'; // Status atual no sistema
    
  funcionarioRecebedorId: string; // Quem foi o responsável por receber a encomenda dentro do condomínio
  moradorRecebedorId: string; // Quem realizou a retirada da encomenda no condomínio
  dataRetirada: string; // 2024-03-12 12:00:00
  codigoRetirada: number // 6 dígitos gerados aleatoriamente
}
