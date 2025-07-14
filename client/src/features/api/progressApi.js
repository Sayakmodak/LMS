import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const base_url = "http://localhost:8080/api/v1/progress";

export const courseProgressApi = createApi({
    reducerPath: 'courseProgressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        credentials: "include",
    }),

    endpoints: (builder) => ({
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET"
            })
        }),
        updateLectureProgress: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}/view`,
                method: "POST",
            })
        }),
        markAsCompleted: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/complete`,
                method: "POST"
            })
        }),
        markAsIncompleted: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/incomplete`,
                method: "POST"
            })
        }),
    })
})

export const { useGetCourseProgressQuery, useUpdateLectureProgressMutation, useMarkAsCompletedMutation, useMarkAsIncompletedMutation } = courseProgressApi;