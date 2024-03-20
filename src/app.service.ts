import { Injectable } from '@nestjs/common';

/*
Síndico realiza o cadastro do condomínio. Após o cadastro, é possível incluir blocos/torres e adicionar apartamentos. 

Por meio de um link, o síndico solicita o cadastro de cada morador em seu respectivo apartamento, cabendo a validação do mesmo posteriormente.
 Após os moradores se cadastrarem, terão um ID para acompanhar suas mercadorias.
 O síndico deverá cadastrar os responsáveis pela recepção e entrega da mercadoria ao destinatário.
 Quando a mercadoria chega, o responsável cadastra no sistema o morador e a mercadoria,  e o morador recebe a informação de que a mercadoria chegou.
 A mercadoria deverá conter:

Remetente, destinatário, data de recebimento, data de retirada, responsável pelo recebimento, responsável pela retirada e responsável pela entrega. Deverá conter também  a quantidade de volumes e o código interno.
 Durante a retirada, o responsável pela entrega da baixa no sistema que a mercadoria foi entregue. Será catalogado:

- Id 
- Remetente
- Destinatário MailerModule
- Entregue por
- Retirado por
- Data/hora
 O destinatário receberá um código para retirada, esse código deverá ser informado para o responsável pela entrega. Se estiver correto, a mercadoria pode ser entregue.
 
 Tipo de mercadorias:
- mercadoria
- carta
- carta com AR
- Cartão
*/

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
