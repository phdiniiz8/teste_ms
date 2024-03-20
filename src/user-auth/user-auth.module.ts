import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user-auth.schema';
import { config } from '../config';
import { CondominioService } from 'src/condominio/condominio.service';
import { Condominio } from 'src/condominio/condominio';
import { CondominioModule } from 'src/condominio/condominio.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: config.secretKey,
      signOptions: { expiresIn: '1h' },
    }),
    CondominioModule
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService]
})

export class UserAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}