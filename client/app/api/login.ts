'use server'

import { UserCredentialsType } from "@/utils/formTypesZod";
import { Session } from "@/utils/types";
import { cookies } from "next/headers";

const api_url = "http://localhost:8000";

export const Login = async (credentials: UserCredentialsType) => {
    try {
        const response = await fetch(`${api_url}/user/login`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            }),
            credentials: "include"
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message)
        }

        const data: Session = await response.json();

        const cookieStore = cookies();
        cookieStore.set("acessToken", data.acessToken, {
            httpOnly: true,
            maxAge: data.acessTokenExpiration
        })
        cookieStore.set("refreshToken", data.refreshToken, {
            httpOnly: true,
            maxAge: data.refreshTokenExpiration
        })

        return data;
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const isLogged = () => {
    const isSession = cookies().get("acessToken");

    return isSession != undefined;
}