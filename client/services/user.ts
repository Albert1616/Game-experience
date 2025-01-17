import { UserCredentialsType } from '@/utils/formTypesZod'
import { Session, User } from '@/utils/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    tagTypes: ['Register', 'Verify_email', 'Login'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: 'user/register',
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body
            }),
            invalidatesTags: ['Register']
        }),
        verifyEmail: builder.mutation<String, { email: String, otp: number }>({
            query: (body) => ({
                url: '/user/verifyEmail',
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body
            }),
            invalidatesTags: ['Verify_email']
        }),
        login: builder.mutation<Session, Partial<User>>({
            query: (body) => ({
                url: 'user/login',
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body
            }),
            invalidatesTags: ['Login']
        })
    })
})

export const { useRegisterUserMutation, useVerifyEmailMutation, useLoginMutation } = userApi