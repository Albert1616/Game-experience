import { PrismaClient, User } from "@prisma/client";
import { transporter } from "../config/EmailConfig";

const prisma = new PrismaClient();

export const SendEmailVerificationOTP = async (user: User) => {
    // Generate OTP code
    const code = Math.floor(1000 + Math.random() * 9000);

    // Link to front end
    const link_front = `${process.env.FRONT_END}/account/verifyEmail`

    await prisma.emailVerify.create({
        data: {
            userId: user.id,
            otp: code
        }
    })

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "OTP - Verify your account",
        html: `<p>Obrigado por se registrar em nosso site
        ${user.name}! Para completar seu cadastro visite o link: ${link_front}
        insira o código abaixo e confirme sua conta.</br>
        <h2>${code}</h2></br> O OTP é válido por apenas 30 minutos.</p>`
    })

    return code
}