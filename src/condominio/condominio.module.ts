import { Module, forwardRef } from '@nestjs/common';
import { CondominioService } from './condominio.service';
import { CondominioController } from './condominio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CondominioSchema } from './schemas/condominio.schema';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { PlanoModule } from 'src/plano/plano.module';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { UserAuthService } from 'src/user-auth/user-auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Condominio', schema: CondominioSchema }]),
    JwtModule.register({
      secret: config.secretKey,
      signOptions: { expiresIn: '1h' },
    }),
    PlanoModule, // Importa o PlanoModule para que o PlanoService esteja disponível no escopo deste módulo
  ],
  controllers: [CondominioController],
  providers: [CondominioService],
  exports: [CondominioService], // Exporta o CondominioService para que possa ser utilizado em outros módulos
})
export class CondominioModule { }
