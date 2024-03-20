import { Controller, Post, Body, Get, UseGuards, BadGatewayException, HttpException, HttpStatus, BadRequestException, NotAcceptableException, Delete, Logger } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { AuthGuard } from './auth.guard';
import { GetUsersResponse } from './schemas/interface';
import { config } from 'src/config';

@Controller('api/auth')
export class UserAuthController {

    private readonly logger = new Logger(UserAuthService.name)
    constructor(private readonly userAuthService: UserAuthService) { }

    @Post('register') // Realiza o cadastro
    async registerUser(@Body() body: {
        firstname: string,
        lastname: string,
        cpf: string,
        dob: string,
        email: string,
        password: string,
        telefone: string,
        telefoneEWhatsApp: boolean,
        condominioID: string,
        idAssociacao: string;
        tipoAcesso: number,
    }): Promise<{ message: string }> {
        const { firstname, lastname, cpf, dob, email, password, telefone, telefoneEWhatsApp, condominioID, idAssociacao, tipoAcesso } = body;

        if (tipoAcesso === config.tipoAcesso.admin) { // Administrador
            return await this.userAuthService.registerAdministrator({
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                cpf: cpf.trim(),
                dob: dob.trim(),
                email: email.trim(),
                password: password.trim(),
                telefone: telefone.trim(),
                telefoneEWhatsApp,
                condominioID,
                idAssociacao,
                tipoAcesso
            });
        }
        else if (tipoAcesso === config.tipoAcesso.sindico) { // Síndico
            return await this.userAuthService.registerManager({
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                cpf: cpf.trim(),
                dob: dob.trim(),
                email: email.trim(),
                password: password.trim(),
                telefone: telefone.trim(),
                telefoneEWhatsApp,
                condominioID,
                idAssociacao,
                tipoAcesso
            });
        }
        else if (tipoAcesso === config.tipoAcesso.funcionario) { // Funcionário
            return await this.userAuthService.registerEmployee({
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                cpf: cpf.trim(),
                dob: dob.trim(),
                email: email.trim(),
                password: password.trim(),
                telefone: telefone.trim(),
                telefoneEWhatsApp,
                condominioID,
                idAssociacao,
                tipoAcesso
            });
        }
        else if (tipoAcesso === config.tipoAcesso.morador) { // Morador
            return await this.userAuthService.registerResident({
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                cpf: cpf.trim(),
                dob: dob.trim(),
                email: email.trim(),
                password: password.trim(),
                telefone: telefone.trim(),
                telefoneEWhatsApp,
                condominioID,
                tipoAcesso
            });
        }
        else {
            console.log('74:', tipoAcesso)
            this.logger.error(`Invalid tipoAcesso: ${tipoAcesso}`);
            throw new NotAcceptableException('Invalid tipoAcesso.')
        }
    }

    @Post('login') // Realizar login
    async loginUser(@Body() body: { email: string; password: string }): Promise<{ message: string; token: string }> {
        const { email, password } = body;
        const token = await this.userAuthService.loginUser({ email: email.trim(), password: password.trim() });

        throw new HttpException({ message: 'Login realizado com sucesso!', token }, HttpStatus.OK)
    }

    @Post('validate') // Validar PIN
    async validatePin(@Body() body: { email: string; pin: string }) {
        const { email, pin } = body;

        await this.userAuthService.validateUserPin({ email: email.trim(), pin: pin.trim() });
    }

    @Delete('delete') // Excluir usuário
    async deleteUser(@Body() body: { email: string }) {
        const { email } = body;

        await this.userAuthService.deleteUserCreated({ email: email.trim() });
    }

    @Post('resend') // Reenviar PIN
    async resendPin(@Body() body: { email: string }) {
        const { email } = body;

        await this.userAuthService.reenviarPin({ email: email.trim() });
    }

    @Post('reset-password') // Recuperar Senha
    async resetPassword(@Body() body: { email: string; }) {

        const { email } = body

        await this.userAuthService.resetPassword({ email })

    }

    @Post('revalidate-password') // Atualizar Senha
    async setPassword(@Body() body: { email: string; hashed: string, newPassword: string }) {
        const { email, hashed, newPassword } = body;

        if (!email || email === '') {
            throw new BadRequestException('E-mail não informado.')
        }

        if (!hashed || hashed === '') {
            throw new BadRequestException('Hash não informado.')
        }
        if (!newPassword || newPassword === '') {
            throw new BadRequestException('Senha não informada.')
        }

        // const token = await this.userAuthService.loginUser(email.trim(), password.trim());

        await this.userAuthService.updatePassword({ email, hashed, newPassword })
    }

    @Get('users') // Rota privada para listagem de usuários
    @UseGuards(AuthGuard)
    async getUsers(): Promise<GetUsersResponse[]> {

        return await this.userAuthService.getUsers();
    }

    @Get('teste')
    @UseGuards(AuthGuard)
    async getUserPermission() {
        console.log('Permissões:')
    }

    //     @Get('user') // Rota privada para listagem de usuários
    //     @UseGuards(AuthGuard)
    //     async getUserExists(@Body() body: { email: string }): Promise<GetUsersResponse[]> {
    //         const { email } = body;
    // 
    //         return await this.userAuthService.getUserExists(email);
    //     }
}
