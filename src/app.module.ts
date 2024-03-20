import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserAuthModule } from './user-auth/user-auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CondominioModule } from './condominio/condominio.module';
import { PlanoModule } from './plano/plano.module';
import { EncomendaModule } from './encomenda/encomenda.module';


@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    MailerModule.forRoot({
      transport: {
        host: config.params.email.host, //host smtp
        secure: true, //regras de segurança do serviço smtp
        port: config.params.email.port, // porta
        pool: true,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          //dados do usuário e senha
          user: config.params.email.user,
          pass: config.params.email.password,
        },
        maxConnections: 5,
        maxMessages: 100,
        rateLimit: 10,
        logger: true,
        debug: true,
        // ignoreTLS: true,
      },
      // defaults: { // configurações que podem ser padrões
      //   from: 'no-reply@Condominio',
      // },
    }),
    ScheduleModule.forRoot(),
    UserAuthModule,
    CondominioModule,
    PlanoModule,
    EncomendaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
