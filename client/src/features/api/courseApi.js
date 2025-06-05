// "/api/auth/course"
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';

const base_url = "http://localhost:8080/api/auth/course/"

export const courseApi = createApi({
    reducerPath: 'courseApi',
    tagTypes: ['fetch-creator-course'],
    baseQuery: fetchBaseQuery({

        baseUrl: base_url,
        credentials: 'include'
    }),

    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "create-course",
                method: "POST",
                body: { courseTitle, category }
            }),
            invalidatesTags: ['fetch-creator-course']
        }),

        getCreatorCourse: builder.query({
            query: () => ({
                url: "",
                method: "GET"
            }),
            invalidatesTags: ['fetch-creator-course']
        }),
    })
})

export const { useCreateCourseMutation, useGetCreatorCourseQuery } = courseApi;