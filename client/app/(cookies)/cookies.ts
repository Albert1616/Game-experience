'use server'

import { cookies } from "next/headers"

export const SetCookies = async (name:string, token:string, maxAge:number) => {
    const cookieStore = cookies();

    cookieStore.set(name, token, {
        httpOnly: true,
        maxAge
    })
}