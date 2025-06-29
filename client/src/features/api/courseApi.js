// "/api/auth/course"
import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';
// import { build } from "vite";

const base_url = "http://localhost:8080/api/auth/course/"

export const courseApi = createApi({
    reducerPath: 'courseApi',
    tagTypes: ['fetch-creator-course', 'fetch-creator-lecture'],
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
            invalidatesTags: ['fetch-creator-course'] // to refetch the course automatically
        }),

        getCreatorCourse: builder.query({
            query: () => ({
                url: "",
                method: "GET"
            }),
            providesTags: ['fetch-creator-course'] // to save the request in the cache
        }),

        updateCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ['fetch-creator-course'] // // to refetch the course automatically
        }),

        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET"
            }),
        }),


        // Lectures API
        createLecture: builder.mutation({
            query: ({ courseId, lectureTitle }) => ({
                url: `/${courseId}/lecture`,
                method: "POST",
                body: { lectureTitle }
            }),
        }),

        getAllLectures: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/lecture`,
                method: "GET",
            }),
            providesTags: ['fetch-creator-lecture']
        }),

        updateLecture: builder.mutation({
            query: ({ courseId, lectureId, lectureTitle, isPreviewFree, uploadVideoInfo }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: "POST",
                body: { lectureTitle, isPreviewFree, uploadVideoInfo }
            }),
        }),

        removeLecture: builder.mutation({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['fetch-creator-lecture']
        })
    })
})

export const { useCreateCourseMutation, useGetCreatorCourseQuery, useUpdateCourseMutation, useGetCourseByIdQuery, useCreateLectureMutation, useGetAllLecturesQuery, useUpdateLectureMutation, useRemoveLectureMutation } = courseApi;