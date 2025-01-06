import { User } from "@prisma/client";
import { transporter } from "../config/EmailConfig"
import jwt from "jsonwebtoken";


export const SendPasswordResetLinkEmail = async (user: User) => {
    try {
        const secret = user.id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ UserId: user.id }, secret, { expiresIn: "15m" })

        const link = `${process.env.FRONT_END}/account/changePassword/${user.id}/${token}`

        const response = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Link to reset password",
            html: `<p>Hello ${user.name}. <a href="${link}">Click here</a> to change your password.</p>`
        })

        return response;
    } catch (error) {
        throw new Error(`Error to send email. ${error}`);
    }
}