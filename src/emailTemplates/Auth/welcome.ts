import { MailerService } from '@nestjs-modules/mailer';
export function sendEmailWelcome(name, email, pin) {

    const a = this.MailerService

    return this.MailerService.sendMail({
        to: `${name} <${email}>`,
        from: 'Condominio <no-replyocom.br>',
        subject: 'Seja bem-vindo(a)!',
        html: `<!DOCTYPE html>
        <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="pt-BR">
        
        <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
          <!--[if !mso]><!-->
          <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css">
          <!--<![endif]-->
          <style>
            * {
              box-sizing: border-box;
            }
        
            body {
              margin: 0;
              padding: 0;
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
        
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
        
            p {
              line-height: inherit
            }
        
            .desktop_hide,
            .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
            }
        
            @media (max-width:520px) {
              .desktop_hide table.icons-inner {
                display: inline-block !important;
              }
        
              .icons-inner {
                text-align: center;
              }
        
              .icons-inner td {
                margin: 0 auto;
              }
        
              .fullMobileWidth,
              .row-content {
                width: 100% !important;
              }
        
              .mobile_hide {
                display: none;
              }
        
              .stack .column {
                width: 100%;
                display: block;
              }
        
              .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
              }
        
              .desktop_hide,
              .desktop_hide table {
                display: table !important;
                max-height: none !important;
              }
            }
          </style>
        </head>
        
        <body style="background-color: #f3f3f3; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f3f3f3; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;">
            <tbody>
              <tr>
                <td>
                  <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="pad" style="text-align:center;width:100%;">
                                        <h1 style="margin: 0; color: #555555; direction: ltr; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; font-size: 36px; font-weight: 700; letter-spacing: normal; line-height: 180%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Zapp<span style="color: #c10721;">Food</span></span></h1>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: rgb(65,139,217);
                                            background: -moz-linear-gradient(145deg, rgba(65,139,217,1) 0%, rgba(181,217,255,1) 100%);
                                            background: -webkit-linear-gradient(145deg, rgba(65,139,217,1) 0%, rgba(181,217,255,1) 100%);
                                            background: linear-gradient(145deg, rgba(65,139,217,1) 0%, rgba(181,217,255,1) 100%); border-radius: 10px 10px 0 0; color: #000000; width: 500px;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="image_block block-1" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="pad">
                                        <div class="alignment" align="center" style="line-height:10px"><img class="fullMobileWidth" src="https://assets.Condominio/static/bemvindo.png" style="display: block; height: auto; border: 0; width: 325px; max-width: 100%;" width="325"></div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0 0 10px 10px; color: #000000; width: 500px;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 20px; padding-right: 20px; vertical-align: top; padding-top: 20px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                    <tr>
                                      <td class="pad">
                                        <div style="color:#555555;direction:ltr;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                          <p style="margin: 0;">Olá, <strong>${name}</strong>! 👋</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                    <tr>
                                      <td class="pad">
                                        <div style="color:#555555;direction:ltr;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                          <p style="margin: 0;">Para confirmar que este e-mail é seu, precisamos que digite este código no site ou no APP ZappFood:</p>
                                          <p style="margin: 0;"><h2>${pin}</h2></p>																	
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="pad">
                                        <div style="color:#555555;direction:ltr;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                          <p style="margin: 0;"><strong>Importante: PIN válido por <span style="color: #c10721">5 minutos</span>.</strong></p>								
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                                            <table class="paragraph_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div style="color:#000000;direction:ltr;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                                                            <p style="margin: 0;">🤗 🤝</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                  <table class="paragraph_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                    <tr>
                                      <td class="pad">
                                        <div style="color:#555555;direction:ltr;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                          <p style="margin: 0;">Dúvidas? Acesse nossa página de&nbsp;<a href="https://support.Condominio/" title="Suporte ZappFood" target="_blank" style="text-decoration: underline; color: #0068a5;" rel="noopener">Suporte ZappFood</a>&nbsp;para obter mais informações.</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="pad" style="text-align:center;width:100%;">
                                        <h1 style="margin: 0; color: #555555; direction: ltr; font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif; font-size: 36px; font-weight: 700; letter-spacing: normal; line-height: 180%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Zapp<span style="color: #c10721;">Food</span></span></h1>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" class="social_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                <tr>
                                  <td style="text-align: center; padding-right: 0px; padding-left: 0px;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="126px">
                                      <tr>
                                        <td style="padding: 0 5px 0 5px;">
                                            <a href="https://www.Condominio/social/facebook" style="margin-left: 0.5rem"><img src="https://assets.Condominio/static/icon_facebook.png" width="32" height="32" /></a>
                                        </td>
                                        <td style="padding: 0 5px 0 5px;">
                                            <a href="https://www.Condominio/social/instagram" style="margin-left: 0.5rem"><img src="https://assets.Condominio/static/icon_instagram.png" width="32" height="32" /></a>
                                        </td>
                                        <td style="padding: 0 5px 0 5px;">
                                            <a href="https://www.Condominio/social/twitter" style="margin-left: 0.5rem"><img src="https://assets.Condominio/static/icon_twitter.png" width="32" height="32" /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                  <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                    <tr>
                                      <td class="pad" style="padding-bottom:10px;padding-left:5px;padding-right:5px;padding-top:10px;">
                                        <div style="color:#a9a9a9;direction:ltr;font-family:Ubuntu, Tahoma, Verdana, Segoe, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                          <p style="margin: 0;">Esta é uma mensagem automática. Por favor, não responda.</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table><!-- End -->
        </body>
        
        </html>`,
    });
}