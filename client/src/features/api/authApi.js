import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../authSlice';

const base_url = "http://localhost:8080/api/auth/user/";


export const authApi = createApi({
    reducerPath: 'authApi',

    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (signUpInputData) => ({
                url: "register",
                method: "POST",
                body: signUpInputData
            }),
        }),

        loginUser: builder.mutation({
            query: (loginInputData) => ({
                url: "login",
                method: "POST",
                body: loginInputData
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                try {
                    dispatch(userLoggedIn({ user: result.data.user }))
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET",
            })
        }),

        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET"
            })
        }),

        updateUser: builder.mutation({
            query: (updateFormData) => ({
                url: "profile/update",
                method: "PUT",
                body: updateFormData
            }),
        })
    }),
})


export const { useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation, useLoadUserQuery, useUpdateUserMutation } = authApi;