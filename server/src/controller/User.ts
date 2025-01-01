import { PrismaClient } from "@prisma/client"
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { SendEmailVerificationOTP } from "../../utils/SendEmailVerificationOTP";

const prisma = new PrismaClient();

export const Register = async (req: Request, res: Response) => {
    try {
        //BODY INFO
        const { name, email, password, confirm_password }:
            { name: string, email: string, password: string, confirm_password: string } = req.body;

        //CONDITIONS
        if (!email || !password || !confirm_password) {
            res.status(400).json({ message: "Invalid inputs" });
            return;
        }

        if (password.length < 8) {
            res.status(400).json({ message: "Password must be at least 8 characters" });
            return;
        }

        if (password !== confirm_password) {
            res.status(400).json({ message: "Passwords must be the same" })
            return;
        }

        const existUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existUser) {
            res.status(409).json({ message: "There is already account with this email" })
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
        res.status(500).json({ message: `Error in register user: ${error}` });
    }
}

export const VerifyEmail = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        // CHECK IF EMAIL AND TOP IS VALID
        if (!email || !otp) {
            res.status(400).json({ message: "Email or OTP is missing" });
            return;
        }

        const existsUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!existsUser) {
            res.status(404).json({ message: "Not exists user with this email" });
            return;
        }

        const existsVerifyEmail = await prisma.emailVerify.findFirst({
            where: {
                userId: existsUser.id,
                otp: otp
            }
        })

        if (!existsVerifyEmail) {
            res.status(400).json({ message: "Invalid OTP" });
            return;
        }

        const currentDate = new Date();
        const dataExpiration = new Date(
            existsVerifyEmail.createdAt.getTime() + 30 * 60 * 1000);

        if (currentDate > dataExpiration) {
            res.status(500).json({ message: "OTP expired" })
            return;
        }

        const updateUser = await prisma.user.update({
            where: {
                id: existsUser.id
            },
            data: {
                isVerify: true
            }
        })

        res.status(200).json({ message: "Email verify with sucess" })
    } catch (error) {
        res.status(500).json({ message: "Error to verify email" })
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password }:
            { email: string, password: string } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email or password is missing" })
            return;
        }

        if (password.length < 8) {
            res.status(400).json({ message: "Password must be at least 8 characters" })
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
                res.status(401).json({ message: "Credetials invalid" })
                return;
            }
        } else {
            res.status(401).json({ message: "Credetials invalid" })
            return;
        }

        if (!existsUser.isVerify) {
            res.status(400).json({ message: "Account not verify" })
            return;
        }

    } catch (error) {

    }
}