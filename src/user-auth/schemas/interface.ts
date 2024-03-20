export interface RegisterProps {
    firstname: string;
    lastname: string;
    cpf: string;
    dob: string;
    email: string;
    password: string;
    telefone: string;
    telefoneEWhatsApp: boolean;
    pin?: string;
    pinValidated?: boolean;
    condominioID?: string;
    idAssociacao?: string;
    tipoAcesso: number;
    accessToken?: string;
}

export interface ValidateUserPinProps {
    email: string;
    pin: string
}

export interface ReenviarPinProps {
    email: string;
}

export interface ResetPasswordProps {
    email: string;
}

export interface UpdatePasswordProps {
    email: string;
    hashed: string;
    newPassword: string;
}

export interface LoginUserProps {
    email: string;
    password: string;
}

export interface SendMailWelcomePinProps {
    firstname: string;
    email: string;
    pin: string
}

export interface SendMailWelcomeProps {
    firstname: string;
    email: string;
}

export interface SendMailResetPasswordProps {
    firstname: string;
    email: string;
    hash: string
}

export interface SendMailResetedPasswordProps {
    firstname: string;
    email: string;
}

export interface SendMailPasswordUpdatedProps {
    firstname: string;
    email: string;
}

export interface GetUsersResponse {
    firstname: string;
    lastname: string;
    dob: string;
    cpf?: string;
    email: string;
    password?: string;
    telefone: string;
    telefoneEWhatsApp: boolean;
    pin?: string;
    pinValidated: boolean;
    pinValidUntil: string;
}