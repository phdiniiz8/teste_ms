import { Module } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { PlanoController } from './plano.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanoSchema } from './schemas/plano.schema';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Plano', schema: PlanoSchema }]),
    JwtModule.register({
      secret: config.secretKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [PlanoService], // Exporta o PlanoService para que possa ser utilizado em outros módulos
  controllers: [PlanoController],
  providers: [PlanoService],
})
export class PlanoModule {}
