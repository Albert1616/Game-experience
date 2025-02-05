import { Game, typesGames, User } from '@/src/utils/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Session } from '@/src/utils/types'
import Cookies from 'js-cookie'
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/',
        // prepareHeaders(headers, { endpoint }) {
        //     if (endpoint === "verifySession") {
        //         const acessToken = Cookies.get("AcessToken");
        //         if (!acessToken) {
        //             console.log("Acess token nao foi passado")
        //         }

        //         console.log(`Acess token ${acessToken}`);

        //         if (acessToken) {
        //             console.log(`Acess token ${acessToken}`);
        //             headers.set('authorization', `Bearer ${acessToken}`);
        //         }
        //     }
        //     return headers;
        // },
    }),
    tagTypes: ['Games', 'Register', 'Verify_email',
        'Login', 'Logout', 'Profile', 'Verify_session'],



    endpoints: (builder) => ({
        getGames: builder.query<Game[], void>({
            query: () => "/games",
            providesTags: ["Games"]
        }),
        getGamesBy: builder.query<Game[], typesGames>({
            query: (type) => type === "latest" ? "games/latest" : "games/rating",
            providesTags: ["Games"]
        }),
        getGamesByGenre: builder.query<Game[], String>({
            query: (genre) => `/games/genre?genre=${genre}`,
            providesTags: ["Games"]
        }),
        getGameById: builder.query<Game, String>({
            query: (id) => `/games/detail/${id}`,
            providesTags: ['Games']
        }),
        SearchGames: builder.query<Game[], String>({
            query: (query) => `/games/search?query=${query}`,
            providesTags: ['Games']
        }),
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
                body,
                credentials: "include"
            }),
            invalidatesTags: ['Login']
        }),
        logout: builder.mutation<String, void>({
            query: () => ({
                url: "/user/logout",
                method: 'POST',
                body: {},
                credentials: "include"
            }),
            invalidatesTags: ['Logout']
        }),
        verifySession: builder.query<{ message: string }, void>({
            query: () => ({
                url: "/user/verifySession",
                headers: {
                    "Content-type": "Application/json",
                },
                credentials: "include"
            }),
            providesTags: ['Verify_session']
        }),
        profile: builder.query<Partial<User>, void>({
            query: () => ({
                url: "/user/profile",
                credentials: "include"
            }),
            providesTags: ['Profile']
        })
    })
})

export const {
    useGetGamesQuery,
    useGetGamesByQuery,
    useGetGamesByGenreQuery,
    useGetGameByIdQuery,
    useSearchGamesQuery,
    useRegisterUserMutation,
    useVerifyEmailMutation,
    useLoginMutation,
    useLogoutMutation,
    useVerifySessionQuery,
    useProfileQuery } = userApi