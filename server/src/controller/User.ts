import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { SendEmailVerificationOTP } from "../../utils/SendEmailVerificationOTP";
import { generateToken } from "../../utils/GenerateToken";
import { SetCookies } from "../../utils/SetCookies";
import { RefreshAcessToken } from "../../utils/RefreshAcessToken";
import { SendPasswordResetLinkEmail } from '../../utils/SendEmailPasswordReset'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export const GetUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Id field is required" });
            return;
        }

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if (!user) {
            res.status(404).json({ message: "tete" });
            return;
        }

        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: `Error to retriving user. ${error}` })
    }
}

export const GetUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ users: users })
    } catch (error) {
        res.status(500).json({ message: "Erro to return an list of the users" })
    }
}

export const Register = async (req: Request, res: Response) => {
    try {
        //BODY INFO
        const { name, email, password, confirm_password }:
            { name: string, email: string, password: string, confirm_password: string } = req.body;

        //CONDITIONS
        if (!name || !email || !password || !confirm_password) {
            res.status(400).json({ message: "Invalid inputs" });
            return;
        }

        if (password.length < 8) {
            res.status(400).json({ message: "A senha deve ter mais de 8 caracteres" });
            return;
        }

        if (password !== confirm_password) {
            res.status(400).json({ message: "As senhas devem ser iguais" })
            return;
        }

        const existUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existUser) {
            res.status(409).json({ message: "Já existe uma conta vinculada a este email." })
            return;
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = bcrypt.hashSync(password, salt);

        //CREATE USER
        const response = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })

        const otp = await SendEmailVerificationOTP(response);

        if (response) {
            res.status(201).json({ message: response, otp: otp })
        }
    } catch (error) {
        res.status(500).json({ message: `Erro ao criar usuário: ${error}` });
    }
}

export const VerifyEmail = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        // CHECK IF EMAIL AND TOP IS VALID
        if (!email || !otp) {
            res.status(400).json({ message: "Email ou OTP inválidos!" });
            return;
        }

        const existsUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!existsUser) {
            res.status(404).json({ message: "Não existe usuário vinculado a este email." });
            return;
        }

        const existsVerifyEmail = await prisma.emailVerify.findFirst({
            where: {
                userId: existsUser.id,
                otp: otp
            }
        })

        if (!existsVerifyEmail) {
            res.status(400).json({ message: "OTP inválido." });
            return;
        }

        const currentDate = new Date();
        const dataExpiration = new Date(
            existsVerifyEmail.createdAt.getTime() + 30 * 60 * 1000);

        if (currentDate > dataExpiration) {
            SendEmailVerificationOTP(existsUser);
            res.status(500).json({ message: "OTP expirado! Um novo código de confirmação foi enviado para seu email." })
            return;
        }

        await prisma.user.update({
            where: {
                id: existsUser.id
            },
            data: {
                isVerify: true
            }
        })

        res.status(200).json({ message: "Email foi verificado com sucesso!" })
    } catch (error) {
        res.status(500).json({ message: `Erro ao verificar email. ${error}` })
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password }:
            { email: string, password: string } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email e senha são obrigatórios!" })
            return;
        }

        if (password.length < 8) {
            res.status(400).json({ message: "A senha deve ter mais que 8 caracteres" })
            return;
        }

        const existsUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existsUser) {
            const passwordVerify = await bcrypt.compare(password, existsUser?.password);
            if (!passwordVerify) {
                res.status(401).json({ message: "Email ou senha inválidos!" })
                return;
            }
        } else {
            res.status(401).json({ message: "Email ou senha inválidos!" })
            return;
        }

        if (!existsUser.isVerify) {
            SendEmailVerificationOTP(existsUser)
            res.status(400).json({ message: "A conta ainda não foi verificada. Um novo de link de verificação foi enviado para o seu email." })
            return;
        }

        const { acessToken, refreshToken,
            acessTokenExpiration, refreshTokenExpiration } =
            await generateToken(existsUser);

        SetCookies({ res, acessToken, refreshToken, acessTokenExpiration, refreshTokenExpiration });

        res.status(200).json({
            status: "Sucess",
            message: "Login efetuado com sucesso!",
            acessToken: acessToken,
            refreshToken: refreshToken,
            acessTokenExpiration: acessTokenExpiration,
            refreshTokenExpiration: refreshTokenExpiration,
            isAuth: true
        })

    } catch (error) {
        res.status(500).json({ message: `Falha na autenticação. ${error}` })
    }
}

export const GetNewAcessToken = async (req: Request, res: Response) => {
    try {
        const data = await RefreshAcessToken(req, res);

        if (!data) {
            res.status(500).json({ message: "Error to response" })
            return;
        }

        const {
            newAcessToken, newRefreshToken,
            newAcessTokenExpiration, newRefreshTokenExpiration
        } = data;

        SetCookies({
            res, acessToken: newAcessToken,
            refreshToken: newRefreshToken,
            acessTokenExpiration: newAcessTokenExpiration,
            refreshTokenExpiration: newRefreshTokenExpiration
        });

        res.status(200).json({
            status: "Sucess",
            message: "Generate new tokens",
            acessToken: newAcessToken,
            refreshToken: newRefreshToken,
            acessTokenExpiration: newAcessTokenExpiration,
            refreshTokenExpiration: newRefreshTokenExpiration,
            isAuth: true
        })
    } catch (error) {
        res.status(500).json({ message: "Error to generate new tokens" });
        return;
    }
}

export const Logout = async (req: Request, res: Response) => {
    try {
        const acessToken = req.cookies.AcessToken

        if (!acessToken) {
            res.status(400).json({ message: "User not logged in" });
            return;
        }

        res.clearCookie("AcessToken");
        res.clearCookie("RefreshToken");
        res.status(200).json({ message: "Logout sucessful" })
    } catch (error) {
        res.status(500).json({ message: "Logout failed" })
    }
}

export const ChangePassword = async (req: Request, res: Response) => {
    try {

        const { password, confirmPassword }:
            { password: string, confirmPassword: string } = req.body;

        if (!password || !confirmPassword) {
            res.status(400).json({ message: "Password and confirm password is required" })
            return;
        }

        if (password != confirmPassword) {
            res.status(400).json({ message: "Password and confirm password don't match" })
            return;
        }

        if (!req.user) {
            res.status(400).json({ message: "User not logged in" });
            return;
        }

        const user = await prisma.user.findFirst({
            where: {
                id: req.user.id
            }
        })

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT!))
        const hashPassword = bcrypt.hashSync(password, salt);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashPassword
            }
        })

        res.status(200).json({ message: "User password changed" })
    } catch (error) {
        res.status(500).json({ message: `Error to change user password.${error} ` })
    }
}

export const SendPasswordResetLink = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            res.status(404).json({ message: "Not found user with this email" });
            return;
        }

        await SendPasswordResetLinkEmail(user);

        res.status(200).json({
            status: "Sucess",
            message: "Link send with sucess! verify your email."
        })

    } catch (error) {
        res.status(500).json({ message: "Error to send link to reset password via email" })
    }
}

export const UserPasswordReset = async (req: Request, res: Response) => {
    try {
        const { password, confirm_password } = req.body;
        const { userId, token } = req.params;

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const new_secret = user.id + process.env.JWT_SECRET_KEY;
        const tokenCompare = jwt.verify(token, new_secret);

        if (!password || !confirm_password) {
            res.status(400).json({ message: "password and confirm password fild is required" });
            return;
        }

        if (password != confirm_password) {
            res.status(400).json({ message: "Password and confirm password don't match" });
            return;
        }

        const salt = Number(process.env.SALT);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashedPassword
            }
        })

        res.status(200).json({ message: "Password changed with sucess" })
    } catch (error) {
        res.status(500).json({ message: `Error to change password. ${error}` })
    }
}

export const UserProfile = async (req: Request, res: Response) => {
    try {
        const acessToken = req.cookies.AcessToken;
        let payload;
        try {
            payload = jwt.verify(acessToken, process.env.JWT_SECRET_KEY as string);
        } catch (error) {
            res.status(401).json({ message: "Token inválido ou expirado." });
            return;
        }
        const userId = (payload as { userId: string }).userId;

        if (!userId) {
            res.status(400).json({ message: "Token inválido. ID do usuário não encontrado." });
            return;
        }
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado!" });
            return;
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            nome: user.name
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao retornar as informações do usuário!" });
    }
};
