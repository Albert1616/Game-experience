'use server'

import { cookies } from "next/headers"

export const isAuth = async () => {
    const cookieStore = await cookies();
    const hasAcessToken = cookieStore.has("AcessToken");

    return hasAcessToken;
}