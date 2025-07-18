import React from 'react'
import Course from './Course'
import { CourseSkeleton } from './Courses';
import { useLoadUserQuery } from '@/features/api/authApi';

const MyLearning = () => {
    // const isLoading = false;
    const { data, isLoading, refetch } = useLoadUserQuery();
    console.log(data);
    const enrolledCourses = data?.user.enrolledCourses || [];


    return (
        <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
            <h1 className='font-bold text-2xl'>My Learning</h1>
            <div className='py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    isLoading ? (enrolledCourses.length < 1 ? <CourseSkeleton /> : (enrolledCourses.map((_, index) => {
                        return <CourseSkeleton key={index} />
                    }))) : enrolledCourses.length === 0 ? <p>You have not enrolled in any course yet</p> : enrolledCourses.map((course, index) => {
                        return <Course key={index} course={course} />
                    }
                    )
                }
            </div>
        </div>
    )
}

export default MyLearning
