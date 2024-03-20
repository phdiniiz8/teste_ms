import { BadRequestException, Inject, Injectable, Logger, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateCondominioDto } from './dto/create-condominio.dto';
import { UpdateCondominioDto } from './dto/update-condominio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Condominio } from './condominio';
import { UserAuthService } from '../user-auth/user-auth.service';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from 'src/config';
import { PlanoService } from '../plano/plano.service';
import { User } from '../user-auth/schemas/user-auth.schema';
import 'dotenv/config'

interface sendMailToAdministratorProps {
  firstname: string;
  email: string;
  cnpj: string;
  razaoSocial: string;
  condominioID: string;
  idAssociacao: string;
  plano: string;
  vencimento: number;
  formaDePagamento: string;
  detalhesPlano: {
    maxBlocos: number;
    maxApartamentos: number;
    maxEncomendas: number;
  };
}

@Injectable()
export class CondominioService {

  constructor(
    @InjectModel('Condominio')
    private readonly condominioModel: Model<Condominio>,
    private readonly planoModel: PlanoService,
    private mailerService: MailerService,
  ) { }

  async create(createCondominioDto: CreateCondominioDto) {

    if (createCondominioDto.authKey !== 'uth34w1XSeYUxezvA31ha38sbvhUeuhHM1Yz67bXiiDuO2Ypf1') {

      throw new BadRequestException('Chave inválida.');
    }

    // Verifica se já existe um condominio com esse CNPJ
    const condominio = await this.condominioModel.findOne({ cnpj: this.somenteNumeros(createCondominioDto.cnpj) });

    if (condominio) {
      throw new BadRequestException('Já existe um condomínio cadastrado com este CNPJ.');
    }

    const condominioIDHash = uuidv4()
    const condominioID = condominioIDHash.split('-')

    const detalhesPlano = await this.planoModel.findOne(createCondominioDto.plano)

    const data: sendMailToAdministratorProps = {
      firstname: createCondominioDto.sindicoResponsavel.nome,
      email: createCondominioDto.sindicoResponsavel.email,
      cnpj: createCondominioDto.cnpj,
      razaoSocial: createCondominioDto.razaoSocial,
      condominioID: condominioID[0],
      idAssociacao: condominioID[4],
      plano: detalhesPlano.descricao,
      vencimento: createCondominioDto.vencimento,
      formaDePagamento: createCondominioDto.formaDePagamento,
      detalhesPlano: {
        maxBlocos: detalhesPlano.maxBlocos,
        maxApartamentos: detalhesPlano.maxApartamentos,
        maxEncomendas: detalhesPlano.maxEncomendas
      }
    }

    process.env.ENVIA_EMAIL ? null : this.sendMailToAdministrator(data)

    return await this.condominioModel.create({
      ...createCondominioDto,
      cnpj: this.somenteNumeros(createCondominioDto.cnpj),
      cep: this.somenteNumeros(createCondominioDto.cep),
      telefone: this.somenteNumeros(createCondominioDto.telefone),
      sindicoResponsavel: {
        ...createCondominioDto.sindicoResponsavel
      },
      statusActive: true,
      condominioID: condominioID[0],
      idAssociacao: condominioID[4],
      funcionarios: [],
      blocos: [],
      apartamentos: [],
      faturas: [],
      moradoresNaoVinculados: []
    })
  }

  async findAll() {
    return await this.condominioModel.find();
  }

  async findOneSindico(email: string) {

    const listaCondominios = await this.condominioModel.find()
    let condominioEncontrado = null

    for (let i = 0; i < listaCondominios.length; i++) {

      listaCondominios[i].sindicoResponsavel.email === email && (condominioEncontrado = listaCondominios[i])
    }

    if (condominioEncontrado === null) {
      throw new NotFoundException('Síndico não encontrado.')
    }

    return condominioEncontrado
  }

  async findOneByObjectId(id: string) {
    // Verifica se já existe um condominio com esse CNPJ
    const condominio = await this.condominioModel.findOne({ _id: id });

    if (!condominio) {

      throw new NotFoundException('Condomínio não encontrado.')
    }

    return condominio
  }
  async findOneByCondominioId(id: string) {
    // Verifica se já existe um condominio com esse CNPJ
    const condominio = await this.condominioModel.findOne({ condominioID: id });

    if (!condominio) {

      throw new NotFoundException('Condomínio não encontrado.')
    }

    return condominio
  }

  async findOneByIdAssociacao(id: string) {
    // Verifica se já existe um condominio com esse ID
    console.log('Passou no findOneByCondominioId')
    const exists = await this.condominioModel.findOne({ idAssociacao: id });

    if (!exists) {
      throw new NotFoundException('Id Associação não encontrado.')
    }

    return exists
  }

  async insertFuncionario({ idCondominio, updateCondominioDto }: { idCondominio: string, updateCondominioDto: UpdateCondominioDto }) {

    const exists = await this.condominioModel.findOne({ condominioID: idCondominio });

    if (!exists) {
      throw new NotFoundException('Condomínio não encontrado.')
    }

    await this.condominioModel.findOneAndUpdate({ condominioID: idCondominio }, {
      funcionarios: [
        ...exists.funcionarios,
        updateCondominioDto.funcionarios
      ]
    })
  }

  async insertMorador({ idCondominio, idMorador }: { idCondominio: string, idMorador: object }) {

    const exists = await this.condominioModel.findOne({ condominioID: idCondominio });

    if (!exists) {
      throw new NotFoundException('Condomínio não encontrado.')
    }

    await this.condominioModel.findOneAndUpdate({ condominioID: idCondominio }, {
      moradoresNaoVinculados: [...exists.moradoresNaoVinculados, { _id: idMorador }]
    })
  }

  async update({ id, updateCondominioDto }: { id: string, updateCondominioDto: UpdateCondominioDto }) {
    const exists = await this.condominioModel.findByIdAndUpdate({ _id: id }, {
      ...updateCondominioDto
    })

    return exists
  }

  remove(id: number) {
    return `This action removes a #${id} condominio`;
  }

  somenteNumeros(str: string) {
    return str.replace(/\D/g, '');
  }

  sendMailToAdministrator(data: sendMailToAdministratorProps) {

    this.mailerService.sendMail({
      to: `${data.firstname} <${data.email}>`,
      from: `${config.params.email.from} <${config.params.email.user}>`,
      subject: `Bem vindo(a) à ${config.params.email.from}`,
      html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
        <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
            .u-row {
              width: 600px !important;
            }
      
            .u-row .u-col {
              vertical-align: top;
            }
      
            .u-row .u-col-100 {
              width: 600px !important;
            }
      
          }
      
          @media (max-width: 620px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
      
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
      
            .u-row {
              width: 100% !important;
            }
      
            .u-col {
              width: 100% !important;
            }
      
            .u-col>div {
              margin: 0 auto;
            }
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
      
          p {
            margin: 0;
          }
      
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
      
          * {
            line-height: inherit;
          }
      
          a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
          }
      
          table,
          td {
            color: #000000;
          }
      
          #u_body a {
            color: #0000ee;
            text-decoration: underline;
          }
      
          @media (max-width: 480px) {
            #u_content_text_4 .v-container-padding-padding {
              padding: 5px 10px !important;
            }
      
            #u_content_text_6 .v-line-height {
              line-height: 130% !important;
            }
      
            #u_content_text_11 .v-line-height {
              line-height: 130% !important;
            }
      
            #u_content_text_10 .v-line-height {
              line-height: 130% !important;
            }
          }
        </style>
      
      
      
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
      
      </head>
      
      <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
          <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <div class="v-line-height" style="font-size: 14px; color: #afb0c7; line-height: 170%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">Visualizar e-mail no navegador</span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
                                          <img align="center" border="0" src="${config.logo.white}" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 32%;max-width: 179.2px;" width="179.2" />
      
                                        </td>
                                      </tr>
                                    </table>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
                    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
                                          <img align="center" border="0" src="${config.topImage.welcome}" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;" width="150.8" />
      
                                        </td>
                                      </tr>
                                    </table>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table id="u_content_text_4" style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <div class="v-line-height" style="font-size: 14px; color: #e5f0f5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 20px; line-height: 28px;"><strong><span style="line-height: 19.6px;">Seja bem vindo!!</span></strong></span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
                            <table id="u_content_text_6" style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 55px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <div class="v-line-height" style="font-size: 14px; line-height: 100%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 100%;"><span style="font-size: 22px; line-height: 22px;">Prezado(a) <span style="font-size: 22px; line-height: 22px;">${data.firstname}</span>!<br><br></span></p>
                                      <p style="font-size: 14px; line-height: 100%;"><span style="font-size: 14px; line-height: 14px;">Seja bem vindo ao <strong><span style="font-size: 18px; line-height: 18px;">${config.params.email.from}</span></strong><span style="font-size: 18px; line-height: 18px;">!</span><br><br></span></p>
                                      <p style="font-size: 14px; line-height: 100%;"><span style="font-size: 14px; line-height: 14px;">Abaixo, informações importantes sobre o cadastro de seu condomínio:</span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table id="u_content_text_11" style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 55px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <div class="v-line-height" style="font-size: 14px; line-height: 150%; text-align: center; word-wrap: break-word;">
                                      <p style="line-height: 150%; text-align: left;">CNPJ: <strong>${data.cnpj}</strong><br>Razão Social: <strong>${data.razaoSocial}</strong></p>
                                      <p style="line-height: 150%; text-align: left;">Código ID do condomínio: <span style="background-color: #fbeeb8; line-height: 21px;"><strong>&nbsp;${data.condominioID}&nbsp;</strong></span></p>
                                      <p style="line-height: 150%; text-align: left;">ID de associação ao condomínio: <span style="background-color: #fbeeb8; line-height: 21px;"><strong>&nbsp;${data.idAssociacao}&nbsp;</strong></span></p>
                                      <p style="line-height: 150%; text-align: left;">Plano: <strong>${data.plano}</strong></p>
                                      <p style="line-height: 150%; text-align: left;">Vencimento: <strong>${data.vencimento}</strong></p>
                                      <p style="line-height: 150%; text-align: left;">Forma de pagamento:<strong> ${data.formaDePagamento}</strong></p>
                                      <p style="line-height: 150%; text-align: left;">Descrição do plano:</p>
                                      <ul>
                                        <li style="line-height: 21px; text-align: left;">Blocos:<strong> ${data.detalhesPlano.maxBlocos}</strong></li>
                                        <li style="line-height: 21px; text-align: left;">Apartamentos:<strong> ${data.detalhesPlano.maxApartamentos}</strong></li>
                                        <li style="line-height: 21px; text-align: left;">Encomendas Mensais:<strong> ${data.detalhesPlano.maxEncomendas}</strong></li>
                                      </ul>
                                      <p style="line-height: 150%;"><span style="color: #ba372a; line-height: 21px;"><strong>Obs.:</strong></span> O<strong> "<span style="color: #e03e2d; line-height: 21px;">Código ID do condomínio</span>" </strong>será necessário para o morador conseguir se cadastrar.</p>
                                      <p style="line-height: 150%;">O<strong> "<span style="color: #e03e2d; line-height: 21px;">ID de associação ao condomínio</span>" </strong>será necessário para você se associar ao condomínio como síndico.</p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table id="u_content_text_10" style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 55px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <div class="v-line-height" style="font-size: 14px; line-height: 100%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 100%;"><span style="font-size: 14px; line-height: 14px;">Qualquer dúvida que tiver, basta nos contactar. Estamos prontos para lhe ajudar!</span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 55px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <div class="v-line-height" style="font-size: 14px; line-height: 130%; text-align: center; word-wrap: break-word;">
                                      <p style="line-height: 130%; font-size: 14px;"><span style="font-size: 18px; line-height: 23.4px;">Até logo,</span></p>
                                      <p style="line-height: 130%; font-size: 14px;"><span style="font-size: 18px; line-height: 23.4px;">${config.params.email.from}</span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
                    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 55px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <div class="v-line-height" style="font-size: 14px; color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Fique ligado conosco</strong></span></p>
                                      <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">${config.params.telefone}</span></p>
                                      <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">falecom@${String(config.params.email.from).toLocaleLowerCase()}</span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <div align="center">
                                      <div style="display: table; max-width:195px;">
                                        <!--[if (mso)|(IE)]><table width="195" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:195px;"><tr><![endif]-->
      
      
                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="${config.params.url}/facebook" title="Facebook" target="_blank">
                                                  <img src="https://cdn.tools.unlayer.com/social/icons/circle/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
      
                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="${config.params.url}/twitter" title="X" target="_blank">
                                                  <img src="https://cdn.tools.unlayer.com/social/icons/circle/x.png" alt="X" title="X" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
      
                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="${config.params.url}/instagram" title="Instagram" target="_blank">
                                                  <img src="https://cdn.tools.unlayer.com/social/icons/circle/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
      
                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="mailto:falecom@${String(config.params.email.from).toLocaleLowerCase()}" title="Email" target="_blank">
                                                  <img src="https://cdn.tools.unlayer.com/social/icons/circle/email.png" alt="Email" title="Email" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
      
      
                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                      </div>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">
                    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
      
                                    <div class="v-line-height" style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyright 2024 © Todos os direitos reservados</span></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
      
      </html>`,
    });
  }
}
