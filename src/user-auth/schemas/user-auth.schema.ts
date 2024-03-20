import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, sanitizeFilter } from 'mongoose';
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Schema({ timestamps: true, versionKey: false, })
export class User {
  @Prop({ required: true, trim: true, isRequired: true })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @Prop({ required: true, trim: true, isRequired: true })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @Prop({ required: true, trim: true, isRequired: true })
  @IsNotEmpty()
  @IsString()
  dob: string;

  @Prop({ required: true, trim: true, unique: true, isRequired: true })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @Prop({ required: true, trim: true, unique: true, isRequired: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true, trim: true, isRequired: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop({ required: true, trim: true, isRequired: true })
  @IsNotEmpty()
  @IsString()
  telefone: string;

  @Prop({ required: true, trim: true, isRequired: true })
  @IsNotEmpty()
  @IsBoolean()
  telefoneEWhatsApp: boolean;

  @Prop({ trim: true })
  @IsNotEmpty()
  @IsString()
  pin: string;

  @Prop()
  @IsBoolean()
  pinValidated: boolean;

  @Prop({ trim: true })
  @IsString()
  pinValidUntil: string;

  @Prop()
  @IsNumber()
  pinResend: number;

  @Prop({ trim: true })
  @IsString()
  passwordHash: string;

  @Prop({ trim: true, default: [] })
  @IsArray()
  notificacoes: [
    timestamp: number,
    mensagem: string,
    read: boolean,
    createdAt: Date
  ];

  @Prop({ trim: true })
  @IsString()
  condominioID: string;

  @Prop({ trim: true })
  @IsString()
  idAssociacao: string;

  @Prop({ required: true, trim: true, isRequired: true })
  @IsNumber() // '9241 - Administrador' | '7519 - Síndico' | '9942 - Funcionário' | '1647 - Morador';
  tipoAcesso: number

}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
