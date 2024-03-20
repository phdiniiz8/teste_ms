interface ConfigProps {
    enviarEmail: boolean;
    tipoAcesso: {
        admin: number;
        sindico: number;
        funcionario: number;
        subsindico: number;
        morador: number;
    }
    mongoURI: string;
    secretKey: string;
    params: {
        systemName: string;
        url: string;
        telefone: string;
        email: {
            from: string;
            host: string;
            port: number;
            user: string;
            password: string;
        },
        cryptKey: string;
    },
    logo: {
        white: string;
        black: string;
    }
    topImage: {
        welcome: string;
        resetPassword: string;
    }
    icons: {
        facebook: string;
        twitter: string;
        instagram: string;
        email: string;
    },
}

export const config: ConfigProps = {
    enviarEmail: false,
    tipoAcesso: {
        admin: 123123,
        sindico: 1231234,
        funcionario: 1231235,
        subsindico: 1231236,
        morador: 1231237,
    },
    mongoURI: 'mongodb+srv://',
    secretKey: 'SECTRET VALUE.',
    params: {
        systemName: 'Edificio',
        url: 'http://www.google.com.br',
        telefone: '+55 (00) 00000-0000',
        email: {
            from: 'google.com.br',
            host: 'smtp.google.com',
            port: 465,
            user: 'no-reply@google.com.br',
            password: 'privado'
        },
        cryptKey: 'myTotallySecretKey123'
    },
    logo: {
        white: 'https://i.imgur.com/EMgy1dA.png',
        black: 'https://i.imgur.com/D6rzvNv.png'
    },
    topImage: {
        welcome: 'https://i.imgur.com/W9cwfqb.png',
        resetPassword: 'https://i.imgur.com/4DsxtOc.png',
    },
    icons: {
        facebook: 'https://i.imgur.com/SXFGohC.png',
        twitter: 'https://i.imgur.com/i20Yx6z.png',
        instagram: 'https://i.imgur.com/teBrovf.png',
        email: 'https://i.imgur.com/8Dc6gg6.png'
    }
}