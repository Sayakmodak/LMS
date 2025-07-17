import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useGetCourseProgressQuery, useMarkAsCompletedMutation, useMarkAsIncompletedMutation, useUpdateLectureProgressMutation } from '@/features/api/progressApi';
import { Button } from '@mantine/core'
import { CheckCircle2, CirclePlay } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseProgress = () => {
    const params = useParams();
    const courseId = params.courseId;
    const [currentLecture, seCurrentLecture] = useState(null);

    const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

    const [updateLectureProgress] = useUpdateLectureProgressMutation();

    const [markAsCompleted, { data: markAsCompletedData, isSuccess: markAsCompletedSuccess, isError: markAsCompletedIsError, isLoading: markAsCompletedIsLoading }] = useMarkAsCompletedMutation();

    const [markAsIncompleted, { data: markAsIncompletedData, isSuccess: markAsIncompletedSuccess, isError: markAsIncompletedIsError, isLoading: markAsIncompletedIsLoading }] = useMarkAsIncompletedMutation();

    useEffect(() => {
        console.log(markAsCompletedData);

        if (markAsCompletedSuccess) {
            refetch();
            toast.success(markAsCompletedData.message);
        }
        if (markAsIncompletedData) {
            refetch();
            toast.success(markAsIncompletedData.message);
        }
    }, [markAsCompletedSuccess, markAsIncompletedSuccess]);

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Failed to fetch course details</p>

    console.log(data.data);
    const { courseDetails, progress, completed } = data.data;


    const initialLecture = currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

    const isLectureCompleted = (lectureId) => {
        return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
    }



    const handleSelectLecture = (lecture) => {
        seCurrentLecture(lecture);
    }

    const handleLectureProgress = async (lectureId) => {
        await updateLectureProgress({ courseId, lectureId });
        refetch();
    }

    const handleCompleteCourse = async () => {
        await markAsCompleted(courseId);
    }

    const handleInCompleteCourse = async () => {
        await markAsIncompleted(courseId);
    }
    return (
        <div className='max-w-7xl mx-auto p-4 mt-20 px-11 py-4 space-y-3 border-red-500'>
            {/* Display the course name */}
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">{courseDetails?.courseTitle}</h1>
                <Button
                    onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
                    variant={completed ? "outline" : "default"}>

                    {completed ? <div className='flex items-center'> <CheckCircle2 className='w-4 h-4 mr-2' /> <span>Complete</span></div> : "Mark as completed"}
                </Button>
            </div>

            <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
                    <div>
                        <video
                            src={currentLecture?.videoUrl || initialLecture?.videoUrl}
                            controls={true}
                            className='w-full h-auto md:rounded-lg'
                            onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture?._id)}
                        />
                    </div>
                    <div>
                        {/* display current watching lecture title */}
                        <h3 className='font-medium text-lg'>{
                            `Lecture ${courseDetails.lectures.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture._id)) + 1} : ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`
                        }</h3>
                    </div>
                </div>
                {/* Lecture Sidebar */}
                <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0'>
                    <h2 className='font-semibold text-xl mb-4'>Course Lectures</h2>
                    <div className='flex-1 overflow-auto'>
                        {
                            courseDetails?.lectures.map((lecture, idx) => (
                                <Card key={lecture._id}
                                    className={`m-3 hover:cursor-pointer transition transform ${(lecture._id === currentLecture?._id ? "bg-gray-200" : "dark:bg-gray-500")}`}

                                    onClick={() => handleSelectLecture(lecture)}>
                                    <CardContent className="flex p-4 items-center justify-between">
                                        <div className='flex items-center'>
                                            {
                                                isLectureCompleted(lecture._id) ? <CheckCircle2 size={24} className='text-green-500 mr-2' /> : <CirclePlay className='text-gray-500 mr-2' />
                                            }
                                            <div>
                                                <CardTitle className='text-lg font-medium'>{lecture.lectureTitle}</CardTitle>
                                            </div>
                                        </div>
                                        {
                                            isLectureCompleted(lecture._id) && (
                                                <Badge variant="outline" className='bg-green-200 text-lg-600'>Completed</Badge>
                                            )
                                        }
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseProgress
