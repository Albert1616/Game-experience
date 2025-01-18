import z from 'zod'

// User schema zod
export const User = z.object({
    name: z.string().nonempty({ message: "Por favor informe o seu nome" }),
    email: z.string().email({ message: "Email inválido" }).nonempty({ message: "Por favor informe o seu email" }),
    password: z.string().min(8, { message: "A senha deve ter pelo 8 caracteres" }).nonempty({ message: "Por favor informe a senha" }),
    confirm_password: z.string().min(8, { message: "A senha deve ter pelo 8 caracteres" }).nonempty({ message: "Por favor confirme sua senha" }),
})

export type UserType = z.infer<typeof User>

// UserCredestials schema zod
export const UserCredentials = z.object({
    email: z.string().email({ message: "Email com formato inválido" }).nonempty({ message: "Informe o seu email" }),
    password: z.string().nonempty({ message: "Informe a sua senha" }).min(8, { message: "A senha deve ter no minimo 8 caracteres" })
})

export type UserCredentialsType = z.infer<typeof UserCredentials>